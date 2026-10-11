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

      // Add a guidance message from assistant
      state.messages.push({
        id: `msg-${Date.now()}`,
        sender: "assistant",
        text: "Please provide the course name, detailed instructions/description, and difficulty level.",
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

      const courseTitle =
        (action.payload as any)?.courseName ||
        (action.payload as any)?.title ||
        "course";

      state.messages.push({
        id: `msg-success-${Date.now()}`,
        sender: "assistant",
        text: `Course structure for "${courseTitle}" generated successfully!`,
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
        text: `Failed to generate course structure: ${action.payload}. You can adjust your input and retry.`,
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
