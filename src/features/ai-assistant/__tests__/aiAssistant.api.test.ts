import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createChapter, createLesson, createQuestion, generateCourseFromPlaylist, generateCourseStructure } from "../services/aiAssistant.api";
import { CreateChapterPayload, CreateCoursePayload, CreateLessonPayload } from "../types/aiAssistant.types";
import { SERVER_URL } from "../../../constants/constants";

describe("aiAssistant.api service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should send correct POST request and return data on success", async () => {
    const mockPayload: CreateCoursePayload = {
      courseName: "Threading",
      description: "create course on java threading have 5 chapter and 2 to 3 lesson in each chapter",
      difficulty: "intermediate",
      questionGeneration: false,
    };

    const mockResponse = {
      courseId: "course-123",
      courseName: "Threading",
      courseStructure: {
        chapters: [
          {
            title: "Basics of Threads",
            lessons: [{ title: "Thread Lifecycle" }],
          },
        ],
      },
    };

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await generateCourseStructure(mockPayload);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      `${SERVER_URL}/course-structure/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(mockPayload),
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw a formatted error when the server responds with an error status", async () => {
    const mockPayload: CreateCoursePayload = {
      courseName: "Threading",
      description: "Description",
      difficulty: "beginner",
      questionGeneration: false,
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => ({ message: "Invalid prompt format" }),
    } as Response);

    await expect(generateCourseStructure(mockPayload)).rejects.toThrow(
      "Invalid prompt format"
    );
  });

  it("should handle non-JSON error responses gracefully", async () => {
    const mockPayload: CreateCoursePayload = {
      courseName: "Threading",
      description: "Description",
      difficulty: "beginner",
      questionGeneration: false,
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as Response);

    await expect(generateCourseStructure(mockPayload)).rejects.toThrow(
      "Failed to generate course structure (500 Internal Server Error)"
    );
  });

  describe("createChapter", () => {
    const chapterPayload: CreateChapterPayload = {
      courseId: 1,
      title: "Introduction to Python",
      description: "Learn the basics of Python syntax, variables, and control flow.",
      noOfLessons: 3,
      contentTypes: ["quiz", "code"],
    };

    it("POSTs the chapter payload to /course-structure/chapter", async () => {
      const mockResponse = {
        success: true,
        message: "Chapter created successfully with child hierarchy.",
        data: { id: 10, title: "Introduction to Python", lessons: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      };
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await createChapter(chapterPayload);

      expect(fetchSpy).toHaveBeenCalledWith(`${SERVER_URL}/course-structure/chapter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(chapterPayload),
      });
      expect(result).toEqual(mockResponse);
    });

    it("throws the server error message on failure", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: async () => ({ message: "Course with ID 1 not found" }),
      } as Response);

      await expect(createChapter(chapterPayload)).rejects.toThrow("Course with ID 1 not found");
    });
  });

  describe("createLesson", () => {
    it("POSTs the lesson payload to /course-structure/lesson", async () => {
      const payload: CreateLessonPayload = {
        chapterId: 1,
        title: "Python Control Flow",
        description: "Understanding if-else statements and while/for loops.",
        contentTypes: ["quiz", "code"],
      };
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: { id: 5 } }),
      } as Response);

      await createLesson(payload);

      expect(fetchSpy).toHaveBeenCalledWith(`${SERVER_URL}/course-structure/lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    });
  });

  describe("createQuestion", () => {
    it("POSTs the question payload to /course-structure/generate-questions", async () => {
      const payload = { lessonId: 9, contentTypeId: 1, type: "multiple_choice" as const, questionCount: 2 };
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      await createQuestion(payload);

      expect(fetchSpy).toHaveBeenCalledWith(`${SERVER_URL}/course-structure/generate-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    });
  });

  describe("generateCourseFromPlaylist", () => {
    it("POSTs the playlist payload to /course-structure/generate-from-playlist", async () => {
      const payload = {
        playlistUrl: "https://www.youtube.com/playlist?list=PL123",
        difficulty: "beginner" as const,
        questionGeneration: false,
        maxVideos: 5,
      };
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: {} }),
      } as Response);

      await generateCourseFromPlaylist(payload);

      expect(fetchSpy).toHaveBeenCalledWith(`${SERVER_URL}/course-structure/generate-from-playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
    });
  });
});
