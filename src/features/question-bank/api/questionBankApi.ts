import { baseApi } from '../../../api/api.routes';

// Question Bank API endpoints
export const questionBankApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get question banks with pagination
    getQuestionBanks: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: '/org/question-bank',
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['QuestionBank'],
    }),
    
    // Get question bank by ID
    getQuestionBankById: builder.query({
      query: ({ id }: { id: number }) => ({
        url: `/org/question-bank/${id}`,
        method: 'GET',
      }),
      providesTags: ['QuestionBank'],
    }),
    
    // Get questions in a question bank
    getQuestionBankQuestions: builder.query({
      query: ({ id, page = 1, limit = 10 }: { id: number; page?: number; limit?: number }) => ({
        url: `/org/question-bank/${id}/questions-list`,
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Question'],
    }),
    
    // Get all questions with optional question bank filter
    getAllQuestions: builder.query({
      query: ({ page = 1, limit = 10, questionBankId }: { page?: number; limit?: number; questionBankId?: number }) => ({
        url: '/org/question',
        method: 'GET',
        params: { page, limit, ...(questionBankId && { questionBankId }) },
      }),
      providesTags: ['Question'],
    }),
    
    // Create question bank
    createQuestionBank: builder.mutation({
      query: ({ body }: { body: { name: string; description: string; tags: string[] } }) => ({
        url: '/org/question-bank',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['QuestionBank'],
    }),
    
    // Update question bank
    updateQuestionBank: builder.mutation({
      query: ({ id, body }: { id: number; body: { name: string; description: string; tags: string[] } }) => ({
        url: `/org/question-bank/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['QuestionBank'],
    }),
    
    // Delete question bank
    deleteQuestionBank: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/org/question-bank/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['QuestionBank'],
    }),
    
    // Create question
    createQuestion: builder.mutation({
      query: ({ body }: { body: { text: string; type: string; questionBankId: number; score: number; options?: { text: string; isCorrect: boolean }[]; correctAnswer?: string } }) => ({
        url: '/org/question',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    
    // Update question
    updateQuestion: builder.mutation({
      query: ({ id, body }: { id: number; body: { text: string; type: string; questionBankId: number; score: number; options?: { text: string; isCorrect: boolean }[]; correctAnswer?: string } }) => ({
        url: `/org/question/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Question'],
    }),
    
    // Delete question
    deleteQuestion: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/org/question/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Question'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetQuestionBanksQuery,
  useGetQuestionBankByIdQuery,
  useGetQuestionBankQuestionsQuery,
  useGetAllQuestionsQuery,
  useCreateQuestionBankMutation,
  useUpdateQuestionBankMutation,
  useDeleteQuestionBankMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionBankApiSlice;
