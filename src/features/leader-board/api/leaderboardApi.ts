import { baseApi } from '../../../api/api.routes';
import { CourseLeaderboardApiResponse } from '../types';

export const leaderboardApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /practice/course/:courseId/leaderboard
    getCourseLeaderboard: builder.query<
      CourseLeaderboardApiResponse,
      {
        courseId: string | number;
        chapterId?: string;
        lessonId?: string;
        contentType?: string;
      }
    >({
      query: ({ courseId, chapterId, lessonId, contentType }) => {
        const params: Record<string, string> = {};
        if (chapterId && chapterId !== 'all') params.chapterId = chapterId;
        if (lessonId && lessonId !== 'all') params.lessonId = lessonId;
        if (contentType && contentType !== 'all') params.contentType = contentType;

        return {
          url: `/practice/course/${courseId}/leaderboard`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['Enrollment', 'PracticeSession'],
    }),
  }),
});

export const { useGetCourseLeaderboardQuery } = leaderboardApiSlice;
