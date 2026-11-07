import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AssistantAction,
  AssistantMessage,
  AssistantState,
  GenerateCourseStructureResponse,
} from "../types/aiAssistant.types";

const INITIAL_MESSAGE: AssistantMessage = {
  id: "welcome-message",
  sender: "assistant",
  text: "Hello! I am your Practivo AI Assistant. Select an action below to get started.",
  timestamp: Date.now(),
};

const initialState: AssistantState = {
  isOpen: false,
  selectedAction: null,
  requestStatus: "idle",
  error: null,
  result: null,
  messages: [INITIAL_MESSAGE],
};

export const aiAssistantSlice = createSlice({
  name: "aiAssistant",
  initialState,
  reducers: {
    openAssistant: (state) => {
      state.isOpen = true;
    },
    closeAssistant: (state) => {
      state.isOpen = false;
    },
    toggleAssistant: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectAction: (state, action: PayloadAction<AssistantAction>) => {
      state.selectedAction = action.payload;
      state.requestStatus = "idle";
      state.error = null;
      state.result = null;

      let guidanceText = "Please provide the course name, detailed instructions/description, and difficulty level.";
      if (action.payload === "CREATE_COURSE") {
        guidanceText = "Please provide the course name, detailed instructions/description, and difficulty level.";
      } else if (action.payload === "CREATE_COURSE_WORKFLOW" || action.payload === "CREATE_COURSE_WITH_QUESTIONS") {
        guidanceText = "Provide course details, instructions, and question settings to generate course structure along with chapter quizzes.";
      } else if (action.payload === "CREATE_COURSE_STRUCTURE") {
        guidanceText = "Provide a YouTube playlist link, course title, and prompt instructions to generate your course structure.";
      } else if (action.payload === "CREATE_CHAPTER") {
        guidanceText = "Enter chapter title and learning objectives to generate a new curriculum chapter.";
      } else if (action.payload === "CREATE_LESSON") {
        guidanceText = "Enter lesson title, content prompt, and format to generate a new lesson.";
      } else if (action.payload === "CREATE_QUESTIONS") {
        guidanceText = "Enter the question topic, type, and difficulty to generate practice questions.";
      }

      // Add a guidance message from assistant
      state.messages.push({
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: guidanceText,
        timestamp: Date.now(),
      });
    },
    resetAssistantAction: (state) => {
      state.selectedAction = null;
      state.requestStatus = "idle";
      state.error = null;
      state.result = null;
    },
    generateCourseStructureStart: (state) => {
      state.requestStatus = "loading";
      state.error = null;
    },
    generateCourseStructureSuccess: (
      state,
      action: PayloadAction<GenerateCourseStructureResponse>
    ) => {
      state.requestStatus = "succeeded";
      state.result = action.payload;
      state.error = null;

      const payload = action.payload as any;
      const courseTitle =
        payload?.courseName ||
        payload?.title ||
        payload?.data?.savedCourse?.title ||
        payload?.data?.playlist?.title ||
        "course";

      const isWithQuestions =
        state.selectedAction === "CREATE_COURSE_WITH_QUESTIONS" ||
        state.selectedAction === "CREATE_COURSE_WORKFLOW" ||
        Boolean(payload?.totalQuestions) ||
        Boolean(payload?.hasQuestions) ||
        Boolean(payload?.data?.questionSummary?.total);

      const successText = isWithQuestions
        ? `Course structure and quizzes for "${courseTitle}" generated successfully!`
        : `Course structure for "${courseTitle}" generated successfully!`;

      state.messages.push({
        id: `msg-success-${Date.now()}`,
        sender: "assistant",
        text: successText,
        timestamp: Date.now(),
        status: "success",
        data: action.payload,
      });
    },
    generateCourseStructureFailure: (state, action: PayloadAction<string>) => {
      state.requestStatus = "failed";
      state.error = action.payload;

      state.messages.push({
        id: `msg-error-${Date.now()}`,
        sender: "assistant",
        text: `Failed to generate: ${action.payload}. You can adjust your input and retry.`,
        timestamp: Date.now(),
        status: "error",
      });
    },
    clearAssistantError: (state) => {
      state.error = null;
      if (state.requestStatus === "failed") {
        state.requestStatus = "idle";
      }
    },
    addMessage: (state, action: PayloadAction<AssistantMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [INITIAL_MESSAGE];
    },
    resetAssistantState: (state) => {
      state.selectedAction = null;
      state.requestStatus = "idle";
      state.error = null;
      state.result = null;
      state.messages = [INITIAL_MESSAGE];
    },
  },
});

export const {
  openAssistant,
  closeAssistant,
  toggleAssistant,
  selectAction,
  resetAssistantAction,
  generateCourseStructureStart,
  generateCourseStructureSuccess,
  generateCourseStructureFailure,
  clearAssistantError,
  addMessage,
  clearMessages,
  resetAssistantState,
} = aiAssistantSlice.actions;

// Selectors
export const selectAssistantIsOpen = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.isOpen ?? false;
export const selectSelectedAction = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.selectedAction ?? null;
export const selectRequestStatus = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.requestStatus ?? "idle";
export const selectAssistantError = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.error ?? null;
export const selectAssistantResult = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.result ?? null;
export const selectAssistantMessages = (state: { aiAssistant: AssistantState }) =>
  state.aiAssistant?.messages ?? [];

export default aiAssistantSlice.reducer;
