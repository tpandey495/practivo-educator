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

// Helper to render with fresh Redux store and Router
const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialState,
    route = "/courses",
  }: { initialState?: any; route?: string } = {}
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

  describe("13.2 Component Tests", () => {
    it("opens and closes assistant panel when floating button is clicked", () => {
      renderWithProviders(<AIAssistant />);

      // Initially closed
      expect(screen.queryByTestId("assistant-panel")).toBeNull();

      // Click floating button to open
      const btn = screen.getByTestId("floating-assistant-btn");
      fireEvent.click(btn);
      expect(screen.getByTestId("assistant-panel")).toBeDefined();

      // Click close button inside header
      const closeBtn = screen.getByLabel="Close assistant" ? screen.getByLabelText("Close assistant") : screen.getByTestId("assistant-panel");
      fireEvent.click(screen.getByLabelText("Close assistant"));
      expect(screen.queryByTestId("assistant-panel")).toBeNull();
    });

    it("displays available actions and allows selecting Create Course", () => {
      const { store } = renderWithProviders(<AIAssistant />, {
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
      expect(screen.getByTestId("action-btn-CREATE_COURSE")).toBeDefined();

      // Click Create Course
      fireEvent.click(screen.getByTestId("action-btn-CREATE_COURSE"));

      // Verify form is displayed with all three required fields
      expect(screen.getByTestId("create-course-form")).toBeDefined();
      expect(screen.getByTestId("course-name-field")).toBeDefined();
      expect(screen.getByTestId("description-field")).toBeDefined();
      expect(screen.getByTestId("difficulty-field")).toBeDefined();
      expect(store.getState().aiAssistant.selectedAction).toBe("CREATE_COURSE");
    });

    it("validates empty inputs and displays field-level error messages", () => {
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
        });
      });

      // Success view should appear
      await waitFor(() => {
        expect(screen.getByTestId("create-course-success")).toBeDefined();
        expect(screen.getByText("Course Structure Generated!")).toBeDefined();
      });
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
