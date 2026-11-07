export type AssistantAction =
  | "CREATE_COURSE"
  | "CREATE_COURSE_WORKFLOW"
  | "CREATE_COURSE_STRUCTURE"
  | "CREATE_COURSE_WITH_QUESTIONS"
  | "CREATE_CHAPTER"
  | "CREATE_LESSON"
  | "CREATE_QUESTIONS";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type CourseGenerationMode = "structure_only" | "structure_with_questions";

export interface CreateCourseInput {
  courseName: string;
  description: string;
  difficulty: DifficultyLevel;
  playlistUrl?: string;
  maxVideos?: number;
}

export interface CreateChapterInput {
  title: string;
  description: string;
  courseId?: string | number;
}

/** Content types accepted by the backend for generated lessons. */
export type ChapterContentType = "quiz" | "assignment" | "code" | "blog" | "video";

/** Request body for POST /course-structure/chapter. */
export interface CreateChapterPayload {
  courseId: number;
  title: string;
  description: string;
  noOfLessons: number;
  contentTypes: ChapterContentType[];
}

export interface CreateChapterResponse {
  success?: boolean;
  message?: string;
  data?: {
    id?: number;
    title?: string;
    lessons?: Array<{ id?: number; title?: string }>;
    [key: string]: unknown;
  } | null;
}

/** Request body for POST /course-structure/lesson. */
export interface CreateLessonPayload {
  chapterId: number;
  title: string;
  description: string;
  contentTypes: ChapterContentType[];
}

export interface CreateLessonResponse {
  success?: boolean;
  message?: string;
  data?: {
    id?: number;
    title?: string;
    contents?: unknown[];
    [key: string]: unknown;
  } | null;
}

/** Question types the backend maps to a question type id. */
export type AIQuestionType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "code";

/** Request body for POST /course-structure/generate-questions. */
export interface CreateQuestionPayload {
  lessonId: number;
  contentTypeId: number;
  type: AIQuestionType;
  questionCount: number;
}

export interface CreateQuestionResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export interface CreateLessonInput {
  title: string;
  content: string;
  lessonType?: string;
  chapterId?: string | number;
  courseId?: string | number;
}

export interface CreateQuestionInput {
  topic: string;
  questionType: string;
  difficulty: DifficultyLevel;
  instructions?: string;
  courseId?: string | number;
  lessonId?: string | number;
}

export type ValidationErrors = Partial<Record<keyof CreateCourseInput, string>>;

export type PageType = "courses" | "course_edit" | "questions" | "unknown";

export interface AssistantContext {
  pathname: string;
  searchParams: Record<string, string>;
  pageType: PageType;
  availableActions: AssistantAction[];
  courseId?: string;
  lessonId?: string;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AssistantMessage {
  id: string;
  sender: "assistant" | "user" | "system";
  text: string;
  timestamp: number;
  status?: "pending" | "success" | "error";
  data?: unknown;
}

/**
 * Request body for POST /course-structure/generate.
 * questionGeneration: false -> course structure only, true -> structure along with questions.
 */
export interface CreateCoursePayload {
  courseName: string;
  description: string;
  difficulty: DifficultyLevel;
  questionGeneration: boolean;
}

/**
 * Request body for POST /course-structure/generate-from-playlist.
 * Course name and description are derived from the playlist by the backend.
 */
export interface PlaylistCoursePayload {
  playlistUrl: string;
  difficulty: DifficultyLevel;
  questionGeneration: boolean;
  maxVideos: number;
}

export interface PlaylistCourseResponse {
  success?: boolean;
  message?: string;
  data?: {
    playlist?: { id?: string; title?: string; channelTitle?: string; videoCount?: number };
    savedCourse?: { id?: number; title?: string; chapters?: GeneratedChapter[]; [key: string]: unknown } | null;
    questionSummary?: { total?: number; byLesson?: Record<string, number> };
  };
  [key: string]: unknown;
}

export interface GeneratedLesson {
  title: string;
  description?: string;
  duration?: string | number;
  videoUrl?: string;
}

export interface GeneratedQuestion {
  title?: string;
  questionText?: string;
  type?: string;
  options?: string[];
  correctAnswer?: string | number;
}

export interface GeneratedChapter {
  title: string;
  description?: string;
  lessons?: GeneratedLesson[];
  questions?: GeneratedQuestion[];
}

export interface GenerateCourseStructureResponse {
  courseId?: string | number;
  courseStructure?: {
    chapters?: GeneratedChapter[];
    totalChapters?: number;
    totalLessons?: number;
    totalQuestions?: number;
    hasQuestions?: boolean;
    [key: string]: unknown;
  } | unknown;
  message?: string;
  [key: string]: unknown;
}

export interface AssistantState {
  isOpen: boolean;
  selectedAction: AssistantAction | null;
  requestStatus: RequestStatus;
  error: string | null;
  result: GenerateCourseStructureResponse | null;
  messages: AssistantMessage[];
}

export interface AssistantActionConfig {
  id: AssistantAction;
  label: string;
  description: string;
  iconName?: string;
  badge?: string;
  isAvailable: boolean;
}
