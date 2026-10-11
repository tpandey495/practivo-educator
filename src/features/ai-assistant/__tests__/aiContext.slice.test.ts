import { describe, it, expect } from "vitest";
import aiAssistantReducer, {
  openAssistant,
  closeAssistant,
  toggleAssistant,
  selectAction,
  resetAssistantAction,
  generateCourseStructureStart,
  generateCourseStructureSuccess,
  generateCourseStructureFailure,
  clearAssistantError,
  resetAssistantState,
} from "../store/aiContext.slice";
import { AssistantState } from "../types/aiAssistant.types";

describe("aiAssistant slice", () => {
  const getInitialState = (): AssistantState =>
    aiAssistantReducer(undefined, { type: "@@INIT" });

  it("should have correct initial state", () => {
    const state = getInitialState();
    expect(state.isOpen).toBe(false);
    expect(state.selectedAction).toBeNull();
    expect(state.requestStatus).toBe("idle");
    expect(state.error).toBeNull();
    expect(state.result).toBeNull();
    expect(state.messages.length).toBeGreaterThan(0);
  });

  it("should handle openAssistant, closeAssistant, and toggleAssistant", () => {
    let state = getInitialState();

    state = aiAssistantReducer(state, openAssistant());
    expect(state.isOpen).toBe(true);

    state = aiAssistantReducer(state, closeAssistant());
    expect(state.isOpen).toBe(false);

    state = aiAssistantReducer(state, toggleAssistant());
    expect(state.isOpen).toBe(true);

    state = aiAssistantReducer(state, toggleAssistant());
    expect(state.isOpen).toBe(false);
  });

  it("should handle selecting and resetting an action", () => {
    let state = getInitialState();

    state = aiAssistantReducer(state, selectAction("CREATE_COURSE"));
    expect(state.selectedAction).toBe("CREATE_COURSE");
    expect(state.requestStatus).toBe("idle");
    expect(state.messages.length).toBe(2);

    state = aiAssistantReducer(state, resetAssistantAction());
    expect(state.selectedAction).toBeNull();
  });

  it("should handle request status lifecycle for successful generation", () => {
    let state = getInitialState();
    state = aiAssistantReducer(state, selectAction("CREATE_COURSE"));

    // Start
    state = aiAssistantReducer(state, generateCourseStructureStart());
    expect(state.requestStatus).toBe("loading");
    expect(state.error).toBeNull();

    // Success
    const mockResult = {
      courseId: 101,
      courseName: "Java Threading",
      courseStructure: {
        chapters: [{ title: "Chapter 1" }],
      },
    };
    state = aiAssistantReducer(state, generateCourseStructureSuccess(mockResult));
    expect(state.requestStatus).toBe("succeeded");
    expect(state.result).toEqual(mockResult);
    expect(state.error).toBeNull();
  });

  it("should handle request status lifecycle for failed generation", () => {
    let state = getInitialState();
    state = aiAssistantReducer(state, selectAction("CREATE_COURSE"));

    // Start
    state = aiAssistantReducer(state, generateCourseStructureStart());
    expect(state.requestStatus).toBe("loading");

    // Failure
    const errorMsg = "Server error 500";
    state = aiAssistantReducer(state, generateCourseStructureFailure(errorMsg));
    expect(state.requestStatus).toBe("failed");
    expect(state.error).toBe(errorMsg);

    // Clear error
    state = aiAssistantReducer(state, clearAssistantError());
    expect(state.error).toBeNull();
    expect(state.requestStatus).toBe("idle");
  });

  it("should reset state completely when resetAssistantState is dispatched", () => {
    let state = getInitialState();
    state = aiAssistantReducer(state, selectAction("CREATE_COURSE"));
    state = aiAssistantReducer(state, generateCourseStructureFailure("Some error"));

    state = aiAssistantReducer(state, resetAssistantState());
    expect(state.selectedAction).toBeNull();
    expect(state.requestStatus).toBe("idle");
    expect(state.error).toBeNull();
    expect(state.result).toBeNull();
  });
});
