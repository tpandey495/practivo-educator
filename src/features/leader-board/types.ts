export interface LeaderboardLearner {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  rank: number;
  previousRank?: number;
  totalScore: number;       // Whole course total score
  filteredScore: number;    // Score calculated based on current active filter
  maxScore?: number;        // Max score for active scope
  progress: number;        // Course / filtered progress percentage
  completedUnits: number;
  totalUnits: number;
  attempted?: number;
  correct?: number;
  totalQuestions?: number;
  badge?: string;
  status: 'Active' | 'Completed' | 'Inactive';
  lastActive?: string;
  chapterWiseScore?: ApiChapterScore[];
  lessonWiseScore?: ApiLessonScore[];
  contentTypeWiseScore?: ApiContentTypeScore[];
}

export interface LeaderboardFilterState {
  chapterId: string | 'all';
  lessonId: string | 'all';
  contentType: string | 'all';
  searchQuery: string;
}

export interface ChapterOption {
  id: string | number;
  title: string;
  lessons: LessonOption[];
}

export interface LessonOption {
  id: string | number;
  title: string;
  chapterId: string | number;
  types?: string[];
}

export interface ContentTypeItem {
  id: string;
  label: string;
  iconName?: string;
}

// API Response interfaces for GET /practice/course/:courseId/leaderboard
export interface ApiLearnerUser {
  id: number | string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface ApiScoreMetrics {
  obtained: number;
  max: number;
  percentage: number;
  attempted: number;
  correct: number;
  totalQuestions: number;
}

export interface ApiChapterScore extends ApiScoreMetrics {
  chapterId: number | string;
  chapterTitle: string;
}

export interface ApiLessonScore extends ApiScoreMetrics {
  lessonId: number | string;
  lessonTitle: string;
  chapterId: number | string;
  chapterTitle: string;
}

export interface ApiContentTypeScore extends ApiScoreMetrics {
  contentTypeId: number | string;
  contentTypeName: string;
}

export interface ApiLeaderboardItem {
  learner: ApiLearnerUser;
  totalScore: ApiScoreMetrics;
  chapterWiseScore?: ApiChapterScore[];
  lessonWiseScore?: ApiLessonScore[];
  contentTypeWiseScore?: ApiContentTypeScore[];
}

export interface CourseLeaderboardApiResponse {
  success: boolean;
  data: {
    courseId: number;
    courseTitle: string;
    courseTotalScore: number;
    courseTotalQuestions: number;
    totalLearners: number;
    leaderboard: ApiLeaderboardItem[];
  };
}

