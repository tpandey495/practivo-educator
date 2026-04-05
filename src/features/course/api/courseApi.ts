import { baseApi } from "../../../api/api.routes";

// Course API endpoints
export const courseApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get courses with pagination
    getCourses: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/course",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Course"],
    }),

    // Get course by ID
    getCourseById: builder.query({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // Create course
    createCourse: builder.mutation({
      query: ({ body }: { body: FormData }) => ({
        url: "/course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

    //Update course

    updateCourse: builder.mutation<any, { id: string | number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/course/${id}`, // Ensure the ID is used in the URL
        method: 'PUT',
        body,
      }),
      invalidatesTags: ["Course"],
    }),


    // Delete course
    deleteCourse: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    // Delete question
deleteQuestion: builder.mutation({
  query: ({ id }: { id: number }) => ({
    url: `/question/${id}`,  
    method: "DELETE",
  }),
  invalidatesTags: ["Course"], 
}),

    // Get chapters for a course
    getChapters: builder.query({
      query: ({
        page = 1,
        limit = 10,
        id,
      }: {
        page?: number;
        limit?: number;
        id: number;
      }) => ({
        url: `course/chapter/${id}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Chapter"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetChaptersQuery,
  useUpdateCourseMutation,
  useDeleteQuestionMutation
} = courseApiSlice;
