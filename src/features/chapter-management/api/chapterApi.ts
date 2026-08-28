import { baseApi } from '../../../api/api.routes';
import { ContentTypeConfig } from '../types';

// Chapter API endpoints
export const chapterApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get chapters for a course with pagination
    getChapters: builder.query({
      query: ({ page = 1, limit = 10, id }: { page?: number; limit?: number; id: string }) => ({
        url: `/course/chapter/${id}`,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Chapter'],
    }),

    getContentTypes: builder.query<ContentTypeConfig[], void>({
      query: () => ({
        url: '/config', // backend config endpoint {{baseURL}}/v1/config
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      },
    }),

    // Get lessons with questions for a specific lesson
    getLessonsWithQuestions: builder.query({
      query: ({ lessonId, courseId }: { lessonId: string, courseId: string }) => ({
        url: `/content/course/${courseId}/lesson/${lessonId}`,
        method: 'GET',
      }),
      providesTags: ['Lesson'],
    }),

    // Create chapter
    createChapter: builder.mutation({
      query: ({ body }: { body: { title: string; courseId: number } }) => ({
        url: '/course/chapter',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Chapter'],
    }),

    // Update chapter
    updateChapter: builder.mutation({
      query: ({ courseId, chapterId, title }: { courseId: number; chapterId: number; title: string }) => ({
        url: `/course/${courseId}/chapter/${chapterId}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Chapter'],
    }),

    // Delete chapter
    deleteChapter: builder.mutation({
      query: ({ courseId, chapterId }: { courseId: number; chapterId: number; }) => ({
        url: `/course/${courseId}/chapter/${chapterId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chapter'],
    }),
    // re order chapter querry 
    reorderChapters: builder.mutation({
      query: ({ courseId, chapters }) => ({
        url: `/course/${courseId}/chapter/reorder`,
        method: "POST",
        body: { chapters },
      }),
      invalidatesTags: ["Chapter"],
    }),
    // reorder lesson querry
    reorderLessons: builder.mutation({
      query: ({ chapterId, lessons }) => ({
        url: `/course/${chapterId}/lesson/reorder`,
        method: "POST",
        body: { lessons },
      }),
      invalidatesTags: ["Lesson"],
    }),
    // Create lesson
    createLesson: builder.mutation({
      query: ({ body }: { body: { title: string; content: string; chapterId: number } }) => ({
        url: '/course/lesson',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lesson', 'Chapter'], // Also invalidate Chapter since lessons are part of chapters
    }),

    // Update lesson
    updateLesson: builder.mutation({
      query: ({ lessonId, title }) => ({
        url: `/course/lesson/${lessonId}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ['Lesson'],
    }),

    // Delete lesson
    deleteLesson: builder.mutation({
      query: ({ id, lessonId }: { id?: number; lessonId?: number }) => ({
        url: `/course/lesson/${lessonId ?? id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),

    // config api 


  }),
});



// Export hooks for usage in functional components
export const {
  useGetChaptersQuery,
  useGetLessonsWithQuestionsQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useGetContentTypesQuery,
  useDeleteLessonMutation,
  useReorderChaptersMutation,
  useReorderLessonsMutation,
} = chapterApiSlice;
