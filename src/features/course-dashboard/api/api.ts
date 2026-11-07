import { baseApi } from "../../../api/api.routes";
import { CourseDashboardResponse, DashboardGranularity } from "../types";

export const learnersApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourseLearners: builder.query({
      query: (courseId: string | number) => ({
        url: `/enrollment/${courseId}/learners`,
        method: "GET",
      }),
      providesTags: ["Learners"],
    }),

    getCourseDashboard: builder.query<
      CourseDashboardResponse,
      { courseId: string | number; granularity: DashboardGranularity }
    >({
      query: ({ courseId, granularity }) => ({
        url: `/course/${courseId}/dashboard`,
        method: "GET",
        params: { granularity },
      }),
    }),
  }),
});

export const {
  useGetCourseLearnersQuery,
  useGetCourseDashboardQuery,
} = learnersApiSlice;
