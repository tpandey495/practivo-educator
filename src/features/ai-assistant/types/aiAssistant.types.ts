export type AssistantAction = "CREATE_COURSE";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface CreateCourseInput {
  courseName: string;
  description: string;
  difficulty: DifficultyLevel;
}

export type ValidationErrors = Partial<Record<keyof CreateCourseInput, string>>;

export type PageType = "courses" | "questions" | "unknown";

export interface AssistantContext {
  pathname: string;
  searchParams: Record<string, string>;
  pageType: PageType;
  availableActions: AssistantAction[];
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

export interface CreateCoursePayload {
  courseName: string;
  description: string;
  difficulty: DifficultyLevel;
}

export interface GeneratedChapter {
  title: string;
  description?: string;
  lessons?: {
    title: string;
    description?: string;
    duration?: string | number;
  }[];
}

export interface GenerateCourseStructureResponse {
  courseId?: string | number;
  courseStructure?: {
    chapters?: GeneratedChapter[];
    totalChapters?: number;
    totalLessons?: number;
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
  isAvailable: boolean;
}
