import { describe, it, expect } from "vitest";
import { resolveAssistantContext } from "../hooks/useAssistantContext";

describe("resolveAssistantContext", () => {
  it("should resolve /courses context correctly", () => {
    const context = resolveAssistantContext("/courses", "");
    expect(context.pathname).toBe("/courses");
    expect(context.pageType).toBe("courses");
    expect(context.availableActions).toEqual(["CREATE_COURSE"]);
    expect(context.searchParams).toEqual({});
  });

  it("should parse query parameters correctly", () => {
    const context = resolveAssistantContext(
      "/courses",
      "?tab=1&filter=active"
    );
    expect(context.pageType).toBe("courses");
    expect(context.searchParams).toEqual({
      tab: "1",
      filter: "active",
    });
  });

  it("should resolve questions page context", () => {
    const context = resolveAssistantContext(
      "/courses/edit/questions",
      "?courseId=6&lessonId=47"
    );
    expect(context.pageType).toBe("questions");
    expect(context.searchParams.courseId).toBe("6");
    expect(context.searchParams.lessonId).toBe("47");
  });

  it("should fallback unknown routes gracefully", () => {
    const context = resolveAssistantContext("/settings", "");
    expect(context.pageType).toBe("unknown");
    expect(context.availableActions).toEqual(["CREATE_COURSE"]);
  });
});
