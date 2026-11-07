import { describe, it, expect } from "vitest";
import {
  validateCreateCourseForm,
  isValidYouTubeUrl,
  isValidYouTubePlaylistUrl,
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

  it("should validate YouTube playlist and video URLs correctly", () => {
    expect(isValidYouTubeUrl("https://www.youtube.com/playlist?list=PL123456")).toBe(true);
    expect(isValidYouTubeUrl("https://youtube.com/watch?v=abcd1234")).toBe(true);
    expect(isValidYouTubeUrl("https://youtu.be/abcd1234")).toBe(true);
    expect(isValidYouTubeUrl("http://youtube.com/playlist?list=xyz")).toBe(true);
    expect(isValidYouTubeUrl("not-a-youtube-url")).toBe(false);
    expect(isValidYouTubeUrl("https://vimeo.com/123456")).toBe(false);

    // If an invalid URL is provided, returns error
    const inputWithBadUrl: CreateCourseInput = {
      courseName: "Java Threading",
      description: "Valid description",
      difficulty: "intermediate",
      playlistUrl: "https://invalid-video-site.com/video123",
    };
    const errors = validateCreateCourseForm(inputWithBadUrl);
    expect(errors.playlistUrl).toBe("Please enter a valid YouTube playlist or video URL.");

    // If a valid YouTube playlist URL is provided, no error
    const inputWithGoodUrl: CreateCourseInput = {
      courseName: "Java Threading",
      description: "Valid description",
      difficulty: "intermediate",
      playlistUrl: "https://www.youtube.com/playlist?list=PLabc123",
    };
    const noErrors = validateCreateCourseForm(inputWithGoodUrl);
    expect(noErrors.playlistUrl).toBeUndefined();
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

  describe("YouTube playlist flow", () => {
    const base = { courseName: "", description: "", difficulty: "beginner" as const };

    it("accepts a playlist URL and a valid video count without name or description", () => {
      expect(
        validateCreateCourseForm(
          { ...base, playlistUrl: "https://www.youtube.com/playlist?list=PL123", maxVideos: 5 },
          { isYouTubeFlow: true }
        )
      ).toEqual({});
    });

    it("rejects missing playlist URLs, single-video URLs and out-of-range video counts", () => {
      expect(
        validateCreateCourseForm({ ...base, playlistUrl: "", maxVideos: 5 }, { isYouTubeFlow: true }).playlistUrl
      ).toBe("YouTube playlist URL is required.");
      expect(
        validateCreateCourseForm(
          { ...base, playlistUrl: "https://youtu.be/abc", maxVideos: 5 },
          { isYouTubeFlow: true }
        ).playlistUrl
      ).toBe('Enter a YouTube playlist link (it contains "list=").');
      expect(
        validateCreateCourseForm(
          { ...base, playlistUrl: "https://www.youtube.com/playlist?list=PL1", maxVideos: 0 },
          { isYouTubeFlow: true }
        ).maxVideos
      ).toBe("Number of videos must be between 1 and 200.");
      expect(
        validateCreateCourseForm(
          { ...base, playlistUrl: "https://www.youtube.com/playlist?list=PL1", maxVideos: 201 },
          { isYouTubeFlow: true }
        ).maxVideos
      ).toBe("Number of videos must be between 1 and 200.");
    });

    it("detects playlist links", () => {
      expect(isValidYouTubePlaylistUrl("https://www.youtube.com/playlist?list=PL123")).toBe(true);
      expect(isValidYouTubePlaylistUrl("https://www.youtube.com/watch?v=abc&list=PL123")).toBe(true);
      expect(isValidYouTubePlaylistUrl("https://www.youtube.com/watch?v=abc")).toBe(false);
      expect(isValidYouTubePlaylistUrl("https://vimeo.com/123")).toBe(false);
    });
  });
});
