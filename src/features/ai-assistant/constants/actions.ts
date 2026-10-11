import { AssistantActionConfig } from "../types/aiAssistant.types";

export const ASSISTANT_ACTIONS: AssistantActionConfig[] = [
  {
    id: "CREATE_COURSE",
    label: "Create Course",
    description: "Generate an end-to-end course curriculum with chapters and lessons using AI prompts",
    iconName: "book-plus",
    isAvailable: true,
  },
];

export interface UpcomingActionConfig {
  id: string;
  label: string;
  description: string;
  badge: string;
}

export const UPCOMING_ACTIONS: UpcomingActionConfig[] = [
  {
    id: "CREATE_CHAPTER",
    label: "Create Chapter",
    description: "Auto-generate curriculum chapters with learning objectives",
    badge: "Planned",
  },
  {
    id: "CREATE_LESSON",
    label: "Create Lesson",
    description: "Generate interactive lessons, reading material, and code exercises",
    badge: "Planned",
  },
  {
    id: "CREATE_QUESTIONS",
    label: "Create Questions",
    description: "Generate MCQs and coding practice questions for quizzes",
    badge: "Planned",
  },
];
