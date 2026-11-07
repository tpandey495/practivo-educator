import { describe, it, expect } from "vitest";
import { resolveAssistantContext } from "../hooks/useAssistantContext";

describe("resolveAssistantContext", () => {
  it("should resolve /courses context correctly with ONLY the 2 course creation options", () => {
    const context = resolveAssistantContext("/courses", "");
    expect(context.pathname).toBe("/courses");
    expect(context.pageType).toBe("courses");
    expect(context.availableActions).toEqual([
      "CREATE_COURSE_WORKFLOW",
      "CREATE_COURSE_STRUCTURE",
    ]);
    expect(context.availableActions).not.toContain("CREATE_CHAPTER");
    expect(context.availableActions).not.toContain("CREATE_LESSON");
    expect(context.availableActions).not.toContain("CREATE_QUESTIONS");
    expect(context.searchParams).toEqual({});
  });

  it("should resolve /courses/edit/3?tab=1 context with CREATE_CHAPTER and CREATE_LESSON only", () => {
    const context = resolveAssistantContext("/courses/edit/3", "?tab=1");
    expect(context.pageType).toBe("course_edit");
    expect(context.availableActions).toEqual(["CREATE_CHAPTER", "CREATE_LESSON"]);
    expect(context.courseId).toBe("3");
    expect(context.searchParams.tab).toBe("1");
    expect(context.availableActions).not.toContain("CREATE_COURSE");
    expect(context.availableActions).not.toContain("CREATE_QUESTIONS");
  });

  it("should resolve /courses/edit/questions?courseId=3&lessonId=9 with CREATE_QUESTIONS only", () => {
    const context = resolveAssistantContext(
      "/courses/edit/questions",
      "?courseId=3&lessonId=9"
    );
    expect(context.pageType).toBe("questions");
    expect(context.availableActions).toEqual(["CREATE_QUESTIONS"]);
    expect(context.courseId).toBe("3");
    expect(context.lessonId).toBe("9");
    expect(context.availableActions).not.toContain("CREATE_COURSE");
    expect(context.availableActions).not.toContain("CREATE_CHAPTER");
    expect(context.availableActions).not.toContain("CREATE_LESSON");
  });

  it("should parse query parameters correctly", () => {
    const context = resolveAssistantContext(
      "/courses",
      "?tab=1&filter=active"
    );
    expect(context.searchParams).toEqual({
      tab: "1",
      filter: "active",
    });
  });

  it("should fallback unknown routes gracefully", () => {
    const context = resolveAssistantContext("/settings", "");
    expect(context.pageType).toBe("unknown");
    expect(context.availableActions).toEqual([
      "CREATE_COURSE_WORKFLOW",
      "CREATE_COURSE_STRUCTURE",
    ]);
  });
});
