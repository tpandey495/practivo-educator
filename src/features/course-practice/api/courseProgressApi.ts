

// Old codebase endpoints used by Course Progress
// - GET /org/student/chapter/course/:id -> course with chapters/units for student
// - GET /content/course/2/unit/:unitId -> questions for a unit

import { baseApi } from "../../../api/api.routes";

export const courseProgressApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonAndTopicByCourseId: builder.query<{ data?: any } | any, { id: string }>({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),

    getContentByTopicId: builder.query<{ data?: any } | any, { unitId: string, courseId: string }>({
      query: ({courseId, unitId }) => ({
        url: `/practice/course/${courseId}/unit/${unitId}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),
  }),
});

export const {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
} = courseProgressApiSlice;


