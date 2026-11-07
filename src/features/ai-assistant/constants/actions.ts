import { AssistantActionConfig, ChapterContentType } from "../types/aiAssistant.types";

export const ALL_ASSISTANT_ACTIONS: AssistantActionConfig[] = [
  // 1. Courses Page: Create Course, Create Course Workflow, Create Course (YouTube)
  {
    id: "CREATE_COURSE",
    label: "Create Course",
    description: "Generate course syllabus, chapters, and lessons using AI prompt",
    iconName: "book-open",
    badge: "AI Prompt",
    isAvailable: true,
  },
  {
    id: "CREATE_COURSE_WORKFLOW",
    label: "Create Course Workflow",
    description: "Generate complete course structure along with chapter quizzes and practice questions",
    iconName: "list-checks",
    badge: "Full Workflow",
    isAvailable: true,
  },
  {
    id: "CREATE_COURSE_STRUCTURE",
    label: "Create Course from YouTube",
    description: "Generate course structure and lessons automatically from a YouTube playlist",
    iconName: "youtube",
    badge: "YouTube Playlist",
    isAvailable: true,
  },
  {
    id: "CREATE_COURSE_WITH_QUESTIONS",
    label: "Create Course along with Questions",
    description: "Generate complete course structure with interactive quizzes & practice questions from a YouTube playlist",
    iconName: "list-checks",
    badge: "Structure + Quizzes",
    isAvailable: true,
  },

  // 2. Course Chapters / Lessons Page (/courses/edit/:courseId?tab=1)
  {
    id: "CREATE_CHAPTER",
    label: "Create Chapter",
    description: "Auto-generate curriculum chapter with structured learning objectives",
    iconName: "layers",
    badge: "Curriculum",
    isAvailable: true,
  },
  {
    id: "CREATE_LESSON",
    label: "Create Lesson",
    description: "Generate interactive lesson content, reading material, and exercises",
    iconName: "file-text",
    badge: "Lesson",
    isAvailable: true,
  },

  // 3. Questions Page (/courses/edit/questions?courseId=3&lessonId=9)
  {
    id: "CREATE_QUESTIONS",
    label: "Create Question",
    description: "Generate MCQs, coding challenges, and assessment questions for this lesson",
    iconName: "help-circle",
    badge: "Assessment",
    isAvailable: true,
  },
];

export const ASSISTANT_ACTIONS = ALL_ASSISTANT_ACTIONS;

export interface UpcomingActionConfig {
  id: string;
  label: string;
  description: string;
  badge: string;
}

export const UPCOMING_ACTIONS: UpcomingActionConfig[] = [];

/** Content types the backend accepts for AI-generated lessons. */
export const CONTENT_TYPE_OPTIONS: { id: ChapterContentType; label: string }[] = [
  { id: "quiz", label: "Quiz" },
  { id: "code", label: "Code" },
  { id: "assignment", label: "Assignment" },
  { id: "blog", label: "Blog" },
  { id: "video", label: "Video" },
];

export const DEFAULT_CONTENT_TYPES: ChapterContentType[] = ["quiz", "code"];
