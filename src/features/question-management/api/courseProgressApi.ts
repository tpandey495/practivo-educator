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

    getContentByTopicId: builder.query<{ data?: any } | any, { lessonId: string, courseId: string, contentTypeId: string }>({
      query: ({ courseId, lessonId, contentTypeId }) => ({
        url: `/practice/course/${courseId}/lesson/${lessonId}/contentTypeId/${contentTypeId}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
    }),

    // All questions of a lesson (every content type), sorted by `order`.
    getQuestionsByLessonId: builder.query<{ id: number; order: number }[], number>({
      query: (lessonId) => ({
        url: `/question/lesson/${lessonId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) =>
        Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [],
      providesTags: ['Question'],
    }),

    // Reorder every question in a lesson. `questions` must hold ALL question IDs of the
    // lesson; each ID's index becomes its order. Admin only.
    reorderLessonQuestions: builder.mutation<unknown, { lessonId: number; questions: number[] }>({
      query: ({ lessonId, questions }) => ({
        url: `/question/lesson/${lessonId}/reorder`,
        method: 'PUT',
        body: { questions },
      }),
    }),
  }),
});

export const {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
  useLazyGetQuestionsByLessonIdQuery,
  useReorderLessonQuestionsMutation,
} = courseProgressApiSlice;
