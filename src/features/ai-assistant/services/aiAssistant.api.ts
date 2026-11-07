import { baseApi } from "../../../api/api.routes";
import { SERVER_URL } from "../../../constants/constants";
import {
  CreateChapterPayload,
  CreateChapterResponse,
  CreateCoursePayload,
  CreateLessonPayload,
  CreateLessonResponse,
  CreateQuestionPayload,
  CreateQuestionResponse,
  GenerateCourseStructureResponse,
  PlaylistCoursePayload,
  PlaylistCourseResponse,
} from "../types/aiAssistant.types";

/**
 * RTK Query endpoints for AI Assistant
 */
export const aiAssistantApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCourseStructure: builder.mutation<
      GenerateCourseStructureResponse,
      CreateCoursePayload
    >({
      query: (payload) => ({
        url: "/course-structure/generate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useGenerateCourseStructureMutation } = aiAssistantApiSlice;

/**
 * POSTs JSON to the server and returns the parsed body.
 * Throws an Error carrying the server's message on non-2xx responses.
 */
async function postJson<T>(path: string, body: unknown, fallbackError: string): Promise<T> {
  const response = await fetch(`${SERVER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorMessage = `${fallbackError} (${response.status} ${response.statusText})`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorJson.error || errorMessage;
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

/**
 * Generates a full course structure (optionally with questions).
 */
export function generateCourseStructure(
  payload: CreateCoursePayload
): Promise<GenerateCourseStructureResponse> {
  return postJson("/course-structure/generate", payload, "Failed to generate course structure");
}

/**
 * Builds a course from a YouTube playlist (each video becomes a lesson),
 * optionally generating questions per video.
 */
export function generateCourseFromPlaylist(
  payload: PlaylistCoursePayload
): Promise<PlaylistCourseResponse> {
  return postJson(
    "/course-structure/generate-from-playlist",
    payload,
    "Failed to create course from YouTube playlist"
  );
}

/**
 * Creates a chapter under a course; the backend AI-generates its lessons and content.
 */
export function createChapter(payload: CreateChapterPayload): Promise<CreateChapterResponse> {
  return postJson("/course-structure/chapter", payload, "Failed to create chapter");
}

/**
 * Creates a lesson under a chapter; the backend AI-generates its content.
 */
export function createLesson(payload: CreateLessonPayload): Promise<CreateLessonResponse> {
  return postJson("/course-structure/lesson", payload, "Failed to create lesson");
}

/**
 * AI-generates questions under a lesson content block.
 */
export function createQuestion(payload: CreateQuestionPayload): Promise<CreateQuestionResponse> {
  return postJson("/course-structure/generate-questions", payload, "Failed to generate questions");
}
