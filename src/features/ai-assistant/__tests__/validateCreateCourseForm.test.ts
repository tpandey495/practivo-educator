import { describe, it, expect } from "vitest";
import {
  validateCreateCourseForm,
  MAX_COURSE_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from "../utils/validateCreateCourseForm";
import { CreateCourseInput } from "../types/aiAssistant.types";

describe("validateCreateCourseForm", () => {
  it("should return errors when courseName is empty", () => {
    const input: CreateCourseInput = {
      courseName: "",
      description: "A valid description for the course",
      difficulty: "beginner",
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.courseName).toBe("Course name is required.");
  });

  it("should return errors when courseName contains only whitespace", () => {
    const input: CreateCourseInput = {
      courseName: "     ",
      description: "A valid description for the course",
      difficulty: "beginner",
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.courseName).toBe("Course name is required.");
  });

  it("should return errors when courseName exceeds maximum length", () => {
    const input: CreateCourseInput = {
      courseName: "a".repeat(MAX_COURSE_NAME_LENGTH + 1),
      description: "A valid description",
      difficulty: "intermediate",
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.courseName).toContain(`must not exceed ${MAX_COURSE_NAME_LENGTH}`);
  });

  it("should return errors when description is empty or whitespace-only", () => {
    const input: CreateCourseInput = {
      courseName: "Java Threading",
      description: "   \t\n   ",
      difficulty: "intermediate",
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.description).toBe("Description is required.");
  });

  it("should return errors when description exceeds maximum length", () => {
    const input: CreateCourseInput = {
      courseName: "Java Threading",
      description: "a".repeat(MAX_DESCRIPTION_LENGTH + 1),
      difficulty: "intermediate",
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.description).toContain(`must not exceed ${MAX_DESCRIPTION_LENGTH}`);
  });

  it("should return errors when difficulty is invalid", () => {
    const input = {
      courseName: "Java Threading",
      description: "Learn threads and locks in depth",
      difficulty: "expert" as any,
    };
    const errors = validateCreateCourseForm(input);
    expect(errors.difficulty).toBe("Select a valid difficulty.");
  });

  it("should return no errors for valid inputs across all difficulties", () => {
    const difficulties: ("beginner" | "intermediate" | "advanced")[] = [
      "beginner",
      "intermediate",
      "advanced",
    ];

    difficulties.forEach((diff) => {
      const input: CreateCourseInput = {
        courseName: "Threading",
        description: "create course on java threading have 5 chapter and 2 to 3 lesson in each chapter",
        difficulty: diff,
      };
      const errors = validateCreateCourseForm(input);
      expect(errors).toEqual({});
      expect(Object.keys(errors).length).toBe(0);
    });
  });
});
