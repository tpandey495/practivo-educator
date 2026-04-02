import { baseApi } from '../../../api/api.routes';

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

    // Get units with questions for a specific unit
    getUnitsWithQuestions: builder.query({
      query: ({ unitId, courseId }: { unitId: string, courseId: string }) => ({
        url: `/content/course/${courseId}/unit/${unitId}`,
        method: 'GET',
      }),
      providesTags: ['Unit'],
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

    // Create unit
    createUnit: builder.mutation({
      query: ({ body }: { body: { title: string; content: string; chapterId: number } }) => ({
        url: '/course/unit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Unit', 'Chapter'], // Also invalidate Chapter since units are part of chapters
    }),

    // Update unit
    updateUnit: builder.mutation({
      query: ({ id, body }: { id: number; body: { title: string; content: string; chapterId: number } }) => ({
        url: `/course/unit/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Unit'],
    }),

    // Delete unit
    deleteUnit: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/course/unit/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Unit'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetChaptersQuery,
  useGetUnitsWithQuestionsQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = chapterApiSlice;
