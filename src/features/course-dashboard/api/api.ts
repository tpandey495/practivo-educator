import { baseApi } from "../../../api/api.routes";

export const learnersApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseLearners: builder.query({
      query: (courseId: string | number) => ({
        url: `/enrollment/${courseId}/learners`,
        method: "GET",
      }),
      providesTags: ["Learners"],
    }),

  }),
});

export const {
  useGetCourseLearnersQuery,
} = learnersApiSlice;