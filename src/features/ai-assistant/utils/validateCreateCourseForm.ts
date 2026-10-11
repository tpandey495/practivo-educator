import { CreateCourseInput, ValidationErrors } from "../types/aiAssistant.types";

export const MAX_COURSE_NAME_LENGTH = 255;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const ALLOWED_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

/**
 * Validates the Create Course form inputs.
 * Returns an object containing field errors, or an empty object if valid.
 */
export function validateCreateCourseForm(values: CreateCourseInput): ValidationErrors {
  const errors: ValidationErrors = {};

  // Course Name Validation
  if (!values.courseName || !values.courseName.trim()) {
    errors.courseName = "Course name is required.";
  } else if (values.courseName.trim().length > MAX_COURSE_NAME_LENGTH) {
    errors.courseName = `Course name must not exceed ${MAX_COURSE_NAME_LENGTH} characters.`;
  }

  // Description Validation
  if (!values.description || !values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
  }

  // Difficulty Validation
  if (!values.difficulty || !ALLOWED_DIFFICULTIES.includes(values.difficulty)) {
    errors.difficulty = "Select a valid difficulty.";
  }

  return errors;
}
