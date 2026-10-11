import { baseApi } from "../../../api/api.routes";
import { SERVER_URL } from "../../../constants/constants";
import {
  CreateCoursePayload,
  GenerateCourseStructureResponse,
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
 * Dedicated API service function that can be used directly or within thunks/tests
 */
export async function generateCourseStructure(
  payload: CreateCoursePayload
): Promise<GenerateCourseStructureResponse> {
  const url = `${SERVER_URL}/course-structure/generate`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `Failed to generate course structure (${response.status} ${response.statusText})`;
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
