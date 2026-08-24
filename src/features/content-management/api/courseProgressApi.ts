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

    getContentByTopicId: builder.query<{ data?: any } | any, { lessonId: string, courseId: string }>({
      query: ({courseId, lessonId }) => ({
        url: `/practice/course/${courseId}/lesson/${lessonId}`,
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
