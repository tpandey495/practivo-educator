import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import aiAssistantReducer from "../store/aiContext.slice";
import { AIAssistant } from "../components/AIAssistant";
import { CreateCourseForm } from "../components/CreateCourseForm";
import * as apiService from "../services/aiAssistant.api";
import * as authHook from "../../../hooks/useAuth";
import { useGetChaptersQuery } from "../../chapter-management/api/chapterApi";
import { useCreditCost } from "../../billing/hooks/useCredits";

// Chapter list used by the Create Lesson dropdown
vi.mock("../../chapter-management/api/chapterApi", () => ({
  useGetChaptersQuery: vi.fn(),
}));

// Credits pill needs the RTK Query baseApi store; not under test here
vi.mock("../../billing/components/CreditsPill", () => ({
  default: () => <div data-testid="credits-pill" />,
}));

// Credit cost lookups also need the RTK Query store; default to "affordable, price unknown"
const DEFAULT_CREDIT = { cost: null, remaining: 0, canAfford: true, isLoading: false };
vi.mock("../../billing/hooks/useCredits", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../billing/hooks/useCredits")>()),
  useCreditCost: vi.fn(() => DEFAULT_CREDIT),
}));
vi.mock("../../billing/components/BuyCreditsModal", () => ({
  default: () => null,
}));

const MOCK_CHAPTERS = [
  { id: 1, title: "Python Basics" },
  { id: 2, title: "Control Flow" },
];

const mockChaptersQuery = (overrides: Record<string, unknown> = {}) =>
  vi.mocked(useGetChaptersQuery).mockReturnValue({
    data: { data: MOCK_CHAPTERS },
    isLoading: false,
    isError: false,
    ...overrides,
  } as any);

// Helper to render with fresh Redux store and Router
const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialState,
    route = "/courses",
  }: {
    initialState?: any;
    route?: string | { pathname: string; search?: string; state?: unknown };
  } = {}
) => {
  const store = configureStore({
    reducer: {
      aiAssistant: aiAssistantReducer,
    },
    preloadedState: initialState ? { aiAssistant: initialState } : undefined,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {ui}
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("AI Assistant UI & Integration Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Default: Mock authorized admin
    vi.spyOn(authHook, "useAuth").mockReturnValue({
      user: { id: 1, username: "admin", email: "admin@practivo.net", roleId: "admin" },
      isAdmin: true,
      isLoggedIn: true,
      isLoading: false,
    });
    mockChaptersQuery();
    vi.mocked(useCreditCost).mockReturnValue(DEFAULT_CREDIT);
  });

  describe("13.4 Authorization Tests", () => {
    it("renders nothing when user is NOT an authorized administrator", () => {
      vi.spyOn(authHook, "useAuth").mockReturnValue({
        user: { id: 2, username: "student", email: "student@practivo.net", roleId: "user" },
        isAdmin: false,
        isLoggedIn: true,
        isLoading: false,
      });

      renderWithProviders(<AIAssistant />);
      expect(screen.queryByTestId("floating-assistant-btn")).toBeNull();
      expect(screen.queryByTestId("assistant-panel")).toBeNull();
    });

    it("renders floating button for authorized admin", () => {
      renderWithProviders(<AIAssistant />);
      expect(screen.getByTestId("floating-assistant-btn")).toBeDefined();
    });
  });

  describe("13.2 Component & Context-Aware Action Tests", () => {
    it("opens and closes assistant panel when floating button is clicked", () => {
      renderWithProviders(<AIAssistant />);

      // Initially closed
      expect(screen.queryByTestId("assistant-panel")).toBeNull();

      // Click floating button to open
      const btn = screen.getByTestId("floating-assistant-btn");
      fireEvent.click(btn);
      expect(screen.getByTestId("assistant-panel")).toBeDefined();

      // Click close button inside header
      fireEvent.click(screen.getByLabelText("Close assistant"));
      expect(screen.queryByTestId("assistant-panel")).toBeNull();
    });

    it("on the courses page (/courses): displays ONLY the 2 course options", () => {
      renderWithProviders(<AIAssistant />, {
        route: "/courses",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      expect(screen.getByTestId("action-selector")).toBeDefined();

      // Exactly the two course creation options
      expect(screen.getByTestId("action-btn-CREATE_COURSE_WORKFLOW")).toBeDefined();
      expect(screen.getByTestId("action-btn-CREATE_COURSE_STRUCTURE")).toBeDefined();

      // Must NOT show plain create course, chapters, lessons, or questions on the courses page
      expect(screen.queryByTestId("action-btn-CREATE_COURSE")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_CHAPTER")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_LESSON")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_QUESTIONS")).toBeNull();
    });

    it("on course edit page (/courses/edit/3?tab=1): displays CREATE_CHAPTER and CREATE_LESSON only", () => {
      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/3?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      expect(screen.getByTestId("action-selector")).toBeDefined();

      // Shows Create Chapter and Create Lesson
      expect(screen.getByTestId("action-btn-CREATE_CHAPTER")).toBeDefined();
      expect(screen.getByTestId("action-btn-CREATE_LESSON")).toBeDefined();

      // Does NOT show course creation or questions options
      expect(screen.queryByTestId("action-btn-CREATE_COURSE")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_COURSE_WORKFLOW")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_COURSE_STRUCTURE")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_QUESTIONS")).toBeNull();
    });

    it("on questions page (/courses/edit/questions?courseId=3&lessonId=9): displays CREATE_QUESTIONS only", () => {
      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/questions?courseId=3&lessonId=9",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      expect(screen.getByTestId("action-selector")).toBeDefined();

      // Shows Create Question only
      expect(screen.getByTestId("action-btn-CREATE_QUESTIONS")).toBeDefined();

      // Does NOT show other page actions
      expect(screen.queryByTestId("action-btn-CREATE_COURSE")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_COURSE_WORKFLOW")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_COURSE_STRUCTURE")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_CHAPTER")).toBeNull();
      expect(screen.queryByTestId("action-btn-CREATE_LESSON")).toBeNull();
    });

    it("displays the YouTube form with playlist URL, difficulty and video count only", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
        route: "/courses",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      // Click Create Course (YouTube)
      fireEvent.click(screen.getByTestId("action-btn-CREATE_COURSE_STRUCTURE"));

      expect(screen.getByTestId("create-course-form")).toBeDefined();
      expect(screen.getByTestId("playlist-url-field")).toBeDefined();
      expect(screen.getByTestId("difficulty-field")).toBeDefined();
      expect(screen.getByTestId("max-videos-field")).toBeDefined();
      expect(screen.queryByTestId("course-name-field")).toBeNull();
      expect(screen.queryByTestId("description-field")).toBeNull();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_COURSE_STRUCTURE");
    });

    it("displays Create Course Workflow in questions mode without YouTube URL field", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
        route: "/courses",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.click(screen.getByTestId("action-btn-CREATE_COURSE_WORKFLOW"));

      expect(screen.getByTestId("create-course-form")).toBeDefined();
      expect(screen.queryByTestId("playlist-url-field")).toBeNull();
      expect(screen.getByText("Generate Course & Questions")).toBeDefined();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_COURSE_WORKFLOW");
    });

    it("displays Create Course form without YouTube URL field when selectedAction is CREATE_COURSE", () => {
      renderWithProviders(
        <CreateCourseForm
          selectedAction="CREATE_COURSE"
          isLoading={false}
          error={null}
          result={null}
          onSubmit={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      expect(screen.getByTestId("create-course-form")).toBeDefined();
      expect(screen.queryByTestId("playlist-url-field")).toBeNull();
    });

    it("allows toggling between Course Structure and Along with Questions mode", () => {
      renderWithProviders(
        <CreateCourseForm
          initialMode="structure_only"
          isLoading={false}
          error={null}
          result={null}
          onSubmit={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      // Initially in structure_only mode
      expect(screen.getByText("Generate Course Structure")).toBeDefined();

      // Switch to Along with Questions mode
      fireEvent.click(screen.getByTestId("mode-tab-questions"));
      expect(screen.getByText("Generate Course & Questions")).toBeDefined();

      // Switch back to Structure mode
      fireEvent.click(screen.getByTestId("mode-tab-structure"));
      expect(screen.getByText("Generate Course Structure")).toBeDefined();
    });

    it("allows selecting Create Chapter on edit page and displays CreateChapterForm", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/3?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.click(screen.getByTestId("action-btn-CREATE_CHAPTER"));
      expect(screen.getByTestId("create-chapter-form")).toBeDefined();
      expect(screen.getByTestId("chapter-title-field")).toBeDefined();
      expect(screen.getByTestId("chapter-description-field")).toBeDefined();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_CHAPTER");
    });

    it("submits Create Chapter form with the expected API payload", async () => {
      const apiSpy = vi.spyOn(apiService, "createChapter").mockResolvedValueOnce({
        success: true,
        message: "Chapter created successfully with child hierarchy.",
        data: { id: 10, title: "Introduction to Python", lessons: [{ id: 1 }, { id: 2 }] },
      });

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/1?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_CHAPTER",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.change(screen.getByPlaceholderText(/Asynchronous JavaScript/i), {
        target: { value: "Introduction to Python" },
      });
      fireEvent.change(screen.getByPlaceholderText(/callback queues/i), {
        target: { value: "Learn the basics of Python syntax, variables, and control flow." },
      });
      fireEvent.change(screen.getByLabelText("Number of Lessons"), { target: { value: "2" } });
      // Defaults are quiz + code; add blog
      fireEvent.click(screen.getByTestId("chapter-content-type-blog"));

      fireEvent.click(screen.getByTestId("submit-chapter-btn"));

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith({
          courseId: 1,
          title: "Introduction to Python",
          description: "Learn the basics of Python syntax, variables, and control flow.",
          noOfLessons: 2,
          contentTypes: ["quiz", "code", "blog"],
        });
      });
      await waitFor(() => {
        expect(screen.getByTestId("create-chapter-success")).toBeDefined();
        expect(screen.getByText("2 Lessons Generated")).toBeDefined();
      });
    });

    it("shows the API error and keeps the Create Chapter form when the request fails", async () => {
      vi.spyOn(apiService, "createChapter").mockRejectedValueOnce(new Error("Course with ID 1 not found"));

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/1?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_CHAPTER",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.change(screen.getByPlaceholderText(/Asynchronous JavaScript/i), { target: { value: "Intro" } });
      fireEvent.change(screen.getByPlaceholderText(/callback queues/i), { target: { value: "Basics" } });
      fireEvent.click(screen.getByTestId("submit-chapter-btn"));

      await waitFor(() => {
        expect(screen.getByTestId("chapter-api-error").textContent).toContain("Course with ID 1 not found");
      });
      expect(screen.getByTestId("create-chapter-form")).toBeDefined();
    });

    it("submits Create Lesson with the chapter chosen from the dropdown", async () => {
      const apiSpy = vi.spyOn(apiService, "createLesson").mockResolvedValueOnce({
        success: true,
        message: "Lesson created successfully.",
        data: { id: 20, title: "Python Control Flow" },
      });

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/1?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_LESSON",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      expect(vi.mocked(useGetChaptersQuery)).toHaveBeenCalledWith(
        { id: "1", page: 1, limit: 100 },
        { skip: false }
      );

      // Open the chapter dropdown and pick "Control Flow"
      fireEvent.mouseDown(screen.getByRole("combobox", { name: "Chapter" }));
      fireEvent.click(await screen.findByRole("option", { name: "Control Flow" }));

      fireEvent.change(screen.getByPlaceholderText(/e\.g\. Python Control Flow/i), {
        target: { value: "Python Control Flow" },
      });
      fireEvent.change(screen.getByPlaceholderText(/if-else statements/i), {
        target: { value: "Understanding if-else statements and while/for loops." },
      });

      fireEvent.click(screen.getByTestId("submit-lesson-btn"));

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith({
          chapterId: 2,
          title: "Python Control Flow",
          description: "Understanding if-else statements and while/for loops.",
          contentTypes: ["quiz", "code"],
        });
      });
      await waitFor(() => {
        expect(screen.getByTestId("create-lesson-success")).toBeDefined();
      });
    });

    it("requires a chapter to be selected before creating a lesson", () => {
      const apiSpy = vi.spyOn(apiService, "createLesson");

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/1?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_LESSON",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.change(screen.getByPlaceholderText(/e\.g\. Python Control Flow/i), { target: { value: "Loops" } });
      fireEvent.change(screen.getByPlaceholderText(/if-else statements/i), { target: { value: "For loops" } });
      fireEvent.click(screen.getByTestId("submit-lesson-btn"));

      expect(screen.getByText("Select the chapter to add this lesson to.")).toBeDefined();
      expect(apiSpy).not.toHaveBeenCalled();
    });

    it("tells the user to create a chapter first when the course has none", () => {
      mockChaptersQuery({ data: { data: [] } });

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/1?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_LESSON",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      expect(screen.getByText("This course has no chapters yet. Create a chapter first.")).toBeDefined();
    });

    it("allows selecting Create Lesson on edit page and displays CreateLessonForm", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/3?tab=1",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.click(screen.getByTestId("action-btn-CREATE_LESSON"));
      expect(screen.getByTestId("create-lesson-form")).toBeDefined();
      expect(screen.getByTestId("lesson-title-field")).toBeDefined();
      expect(screen.getByTestId("lesson-content-field")).toBeDefined();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_LESSON");
    });

    it("allows selecting Create Question on questions page and displays CreateQuestionForm", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/questions?courseId=3&lessonId=9",
        initialState: {
          isOpen: true,
          selectedAction: null,
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
        },
      });

      fireEvent.click(screen.getByTestId("action-btn-CREATE_QUESTIONS"));
      expect(screen.getByTestId("create-question-form")).toBeDefined();
      expect(screen.getByTestId("question-type-field")).toBeDefined();
      expect(screen.getByTestId("question-count-field")).toBeDefined();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_QUESTIONS");
    });

    const questionsPageState = {
      isOpen: true,
      selectedAction: "CREATE_QUESTIONS",
      requestStatus: "idle",
      error: null,
      result: null,
      messages: [{ id: "1", sender: "assistant", text: "Welcome", timestamp: Date.now() }],
    };

    // Mirrors AddContentMenu: lessonId in the query, contentTypeId in router state
    const questionsPageRoute = {
      pathname: "/courses/edit/questions",
      search: "?courseId=3&lessonId=9",
      state: { type: "Code", parentContentType: "Code", contentTypeId: 3 },
    };

    it("shows only question type and count, and the lesson/content type from the page", () => {
      renderWithProviders(<AIAssistant />, {
        route: questionsPageRoute,
        initialState: questionsPageState,
      });

      expect(screen.getByTestId("question-type-field")).toBeDefined();
      expect(screen.getByTestId("question-count-field")).toBeDefined();
      expect(screen.queryByRole("combobox")).toBeNull();
      expect(screen.getByTestId("question-target").textContent).toContain("Lesson #9");
      expect(screen.getByTestId("question-target").textContent).toContain("Code");
    });

    it("submits lessonId and contentTypeId from the page with the chosen type and count", async () => {
      const apiSpy = vi.spyOn(apiService, "createQuestion").mockResolvedValueOnce({
        success: true,
        message: "Question created successfully.",
      });

      renderWithProviders(<AIAssistant />, {
        route: questionsPageRoute,
        initialState: questionsPageState,
      });

      fireEvent.click(screen.getByTestId("question-type-code"));
      fireEvent.change(screen.getByLabelText("Number of Questions"), { target: { value: "4" } });
      fireEvent.click(screen.getByTestId("submit-question-btn"));

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith({ lessonId: 9, contentTypeId: 3, type: "code", questionCount: 4 });
      });
      await waitFor(() => {
        expect(screen.getByTestId("create-question-success")).toBeDefined();
      });
    });

    it("sends the default type and count, reading contentTypeId from the query when there is no router state", async () => {
      const apiSpy = vi.spyOn(apiService, "createQuestion").mockResolvedValueOnce({ success: true });

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/questions?courseId=3&lessonId=9&contentTypeId=1",
        initialState: questionsPageState,
      });

      fireEvent.click(screen.getByTestId("submit-question-btn"));

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith({
          lessonId: 9,
          contentTypeId: 1,
          type: "multiple_choice",
          questionCount: 2,
        });
      });
    });

    it("blocks submission when the page has no content type selected", () => {
      const apiSpy = vi.spyOn(apiService, "createQuestion");

      renderWithProviders(<AIAssistant />, {
        route: "/courses/edit/questions?courseId=3&lessonId=9",
        initialState: questionsPageState,
      });

      expect(screen.getByTestId("question-missing-target")).toBeDefined();
      expect((screen.getByTestId("submit-question-btn") as HTMLButtonElement).disabled).toBe(true);
      expect(apiSpy).not.toHaveBeenCalled();
    });

    it("shows the API error and keeps the form when generation fails", async () => {
      vi.spyOn(apiService, "createQuestion").mockRejectedValueOnce(new Error("Content not found for this lesson"));

      renderWithProviders(<AIAssistant />, {
        route: questionsPageRoute,
        initialState: questionsPageState,
      });

      fireEvent.click(screen.getByTestId("submit-question-btn"));

      await waitFor(() => {
        expect(screen.getByTestId("question-api-error").textContent).toContain("Content not found for this lesson");
      });
      expect(screen.getByTestId("create-question-form")).toBeDefined();
    });

    it("validates empty inputs and displays field-level error messages in CreateCourseForm", () => {
      renderWithProviders(
        <CreateCourseForm
          isLoading={false}
          error={null}
          result={null}
          onSubmit={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const submitBtn = screen.getByTestId("submit-course-btn");
      fireEvent.click(submitBtn);

      expect(screen.getByText("Course name is required.")).toBeDefined();
      expect(screen.getByText("Description is required.")).toBeDefined();
    });

    it("disables submit button and shows loading state when isLoading is true", () => {
      renderWithProviders(
        <CreateCourseForm
          isLoading={true}
          error={null}
          result={null}
          onSubmit={vi.fn()}
          onCancel={vi.fn()}
        />
      );

      const submitBtn = screen.getByTestId("submit-course-btn");
      expect(submitBtn.hasAttribute("disabled")).toBe(true);
      expect(screen.getByText("Generating Structure...")).toBeDefined();
    });
  });

  describe("AI credits", () => {
    const renderCourseForm = (props: Partial<React.ComponentProps<typeof CreateCourseForm>> = {}) =>
      renderWithProviders(
        <CreateCourseForm
          isLoading={false}
          error={null}
          result={null}
          onSubmit={vi.fn()}
          onCancel={vi.fn()}
          {...props}
        />
      );

    it("shows the credit cost before the user submits", () => {
      vi.mocked(useCreditCost).mockReturnValue({ cost: 31, remaining: 2000, canAfford: true, isLoading: false });
      renderCourseForm();

      expect(screen.getByTestId("credit-cost-hint").textContent).toContain("This will use 31 credits");
      expect(screen.getByTestId("submit-course-btn").hasAttribute("disabled")).toBe(false);
    });

    it("disables submit and blocks the request when the balance is too low", () => {
      vi.mocked(useCreditCost).mockReturnValue({ cost: 432, remaining: 100, canAfford: false, isLoading: false });
      const onSubmit = vi.fn();
      renderCourseForm({ onSubmit, selectedAction: "CREATE_COURSE_WORKFLOW" });

      expect(screen.getByTestId("credit-cost-hint").textContent).toContain("Needs 432 credits, you have 100");
      const submitBtn = screen.getByTestId("submit-course-btn");
      expect(submitBtn.hasAttribute("disabled")).toBe(true);
      fireEvent.submit(submitBtn.closest("form")!);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it.each([
      ["CREATE_COURSE", "COURSE_OUTLINE"],
      ["CREATE_COURSE_WITH_QUESTIONS", "COURSE_WITH_QUESTIONS"],
      ["CREATE_COURSE_STRUCTURE", "PLAYLIST_WITHOUT_QUESTIONS"],
    ] as const)("prices %s as the backend's %s operation", (action, operation) => {
      renderCourseForm({ selectedAction: action });
      expect(vi.mocked(useCreditCost)).toHaveBeenLastCalledWith(operation);
    });
  });

  describe("13.3 Integration Tests (End-to-End Workflow)", () => {
    it("successfully creates a course structure via API call", async () => {
      const mockApiResult = {
        courseId: "123",
        courseName: "Java Concurrency",
        courseStructure: {
          chapters: [
            { title: "Introduction to Threads", lessons: [{ title: "Thread Creation" }] },
            { title: "Synchronization", lessons: [{ title: "Locks & Monitors" }] },
          ],
        },
        message: "Course structure generated successfully",
      };

      const apiSpy = vi.spyOn(apiService, "generateCourseStructure").mockResolvedValueOnce(mockApiResult);

      renderWithProviders(<AIAssistant />, {
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_COURSE",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Fill the form", timestamp: Date.now() }],
        },
      });

      // Enter valid values
      const courseNameInput = screen.getByPlaceholderText(/e\.g\. Java Concurrency/i);
      const descriptionInput = screen.getByPlaceholderText(/e\.g\. Create course on Java threading/i);

      fireEvent.change(courseNameInput, { target: { value: "Java Concurrency" } });
      fireEvent.change(descriptionInput, {
        target: { value: "A comprehensive course on Java concurrency and multi-threaded systems" },
      });

      // Submit form
      const submitBtn = screen.getByTestId("submit-course-btn");
      fireEvent.click(submitBtn);

      // Verify API was called with expected payload
      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledWith({
          courseName: "Java Concurrency",
          description: "A comprehensive course on Java concurrency and multi-threaded systems",
          difficulty: "beginner",
          questionGeneration: false,
        });
      });

      // Success view should appear
      await waitFor(() => {
        expect(screen.getByTestId("create-course-success")).toBeDefined();
        expect(screen.getByText("Course Structure Generated!")).toBeDefined();
      });
    });

    const youtubeState = {
      isOpen: true,
      selectedAction: "CREATE_COURSE_STRUCTURE",
      requestStatus: "idle",
      error: null,
      result: null,
      messages: [{ id: "1", sender: "assistant", text: "Fill the form", timestamp: Date.now() }],
    };

    it("creates a course from a YouTube playlist with questions via the playlist endpoint", async () => {
      const mockApiResult = {
        success: true,
        message: "Course created from playlist and questions generated successfully.",
        data: {
          playlist: { id: "PLpython123", title: "Python for Beginners", videoCount: 3 },
          savedCourse: {
            id: 456,
            title: "Python for Beginners",
            chapters: [{ title: "Getting Started", lessons: [{ title: "Python Setup" }] }],
          },
          questionSummary: { total: 6, byLesson: {} },
        },
      };

      const playlistSpy = vi
        .spyOn(apiService, "generateCourseFromPlaylist")
        .mockResolvedValueOnce(mockApiResult);
      const promptSpy = vi.spyOn(apiService, "generateCourseStructure");

      renderWithProviders(<AIAssistant />, { initialState: youtubeState });

      fireEvent.click(screen.getByTestId("mode-tab-questions"));
      fireEvent.change(screen.getByPlaceholderText(/https:\/\/www\.youtube\.com\/playlist/i), {
        target: { value: "https://www.youtube.com/playlist?list=PLpython123" },
      });
      fireEvent.change(screen.getByLabelText("Number of Videos"), { target: { value: "3" } });
      fireEvent.click(screen.getByTestId("submit-course-btn"));

      await waitFor(() => {
        expect(playlistSpy).toHaveBeenCalledWith({
          playlistUrl: "https://www.youtube.com/playlist?list=PLpython123",
          difficulty: "beginner",
          questionGeneration: true,
          maxVideos: 3,
        });
      });
      expect(promptSpy).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(screen.getByTestId("create-course-success")).toBeDefined();
        expect(screen.getByText("Course Structure & Questions Generated!")).toBeDefined();
        expect(screen.getByText("1 Chapters Generated")).toBeDefined();
        expect(screen.getByText("6 Questions Generated")).toBeDefined();
        expect(screen.getByText("Playlist: Python for Beginners")).toBeDefined();
      });
    });

    it("sends questionGeneration false and default maxVideos from the Course Structure tab", async () => {
      const playlistSpy = vi
        .spyOn(apiService, "generateCourseFromPlaylist")
        .mockResolvedValueOnce({ success: true, data: { savedCourse: { title: "JS", chapters: [] } } });

      renderWithProviders(<AIAssistant />, { initialState: youtubeState });

      fireEvent.change(screen.getByPlaceholderText(/https:\/\/www\.youtube\.com\/playlist/i), {
        target: { value: "  https://www.youtube.com/playlist?list=PLjs  " },
      });
      fireEvent.click(screen.getByTestId("submit-course-btn"));

      await waitFor(() => {
        expect(playlistSpy).toHaveBeenCalledWith({
          playlistUrl: "https://www.youtube.com/playlist?list=PLjs",
          difficulty: "beginner",
          questionGeneration: false,
          maxVideos: 5,
        });
      });
    });

    it("requires a playlist link (not a single video) in the YouTube flow", () => {
      const playlistSpy = vi.spyOn(apiService, "generateCourseFromPlaylist");

      renderWithProviders(<AIAssistant />, { initialState: youtubeState });

      fireEvent.click(screen.getByTestId("submit-course-btn"));
      expect(screen.getByText("YouTube playlist URL is required.")).toBeDefined();

      fireEvent.change(screen.getByPlaceholderText(/https:\/\/www\.youtube\.com\/playlist/i), {
        target: { value: "https://www.youtube.com/watch?v=abc123" },
      });
      fireEvent.click(screen.getByTestId("submit-course-btn"));
      expect(screen.getByText('Enter a YouTube playlist link (it contains "list=").')).toBeDefined();

      expect(playlistSpy).not.toHaveBeenCalled();
    });

    it("handles API failure gracefully, displays error banner, and preserves entered form values", async () => {
      const apiSpy = vi
        .spyOn(apiService, "generateCourseStructure")
        .mockRejectedValueOnce(new Error("Rate limit exceeded. Please wait a moment."));

      renderWithProviders(<AIAssistant />, {
        initialState: {
          isOpen: true,
          selectedAction: "CREATE_COURSE",
          requestStatus: "idle",
          error: null,
          result: null,
          messages: [{ id: "1", sender: "assistant", text: "Fill the form", timestamp: Date.now() }],
        },
      });

      const courseNameInput = screen.getByPlaceholderText(/e\.g\. Java Concurrency/i) as HTMLInputElement;
      const descriptionInput = screen.getByPlaceholderText(/e\.g\. Create course on Java threading/i) as HTMLTextAreaElement;

      fireEvent.change(courseNameInput, { target: { value: "Advanced Kubernetes" } });
      fireEvent.change(descriptionInput, { target: { value: "Mastering cluster administration" } });

      const submitBtn = screen.getByTestId("submit-course-btn");
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledTimes(1);
      });

      // Error banner displayed
      await waitFor(() => {
        expect(screen.getByTestId("form-api-error")).toBeDefined();
        expect(screen.getByText("Rate limit exceeded. Please wait a moment.")).toBeDefined();
      });

      // Form values preserved!
      expect(courseNameInput.value).toBe("Advanced Kubernetes");
      expect(descriptionInput.value).toBe("Mastering cluster administration");
    });
  });
});
