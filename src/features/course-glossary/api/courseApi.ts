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

    // ⭐ Get course rating
    getCourseRating: builder.query({
      query: ({ courseId }: { courseId: number }) => ({
        url: `/course/${courseId}/ratings`, // ✅ correct endpoint
        method: "GET",
      }),
      providesTags: ["Rating"],
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

    // Delete course
    deleteCourse: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/course/${id}`,
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
        url: `/course/chapter/${id}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Chapter"],
    }),

  }),
});

// Export hooks
export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCourseRatingQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetChaptersQuery,
} = courseApiSlice;