import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateCourseStructure } from "../services/aiAssistant.api";
import { CreateCoursePayload } from "../types/aiAssistant.types";
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
});
