/**
 * Tiny pub/sub so plain-fetch AI calls can tell the app which cached
 * resources (courses, chapters, lessons, questions) they created, without
 * importing the Redux store (which would create an import cycle).
 * The store subscribes once and invalidates the matching RTK Query tags,
 * so every mounted query showing that data refetches.
 */
export type AiResourceTag = "Course" | "Chapter" | "Lesson" | "Unit" | "Question";

type Listener = (tags: AiResourceTag[]) => void;

const listeners = new Set<Listener>();

export const onAiResourcesChanged = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Call after an AI request successfully created resources. */
export const notifyAiResourcesChanged = (tags: AiResourceTag[]) => {
  if (tags.length === 0) return;
  listeners.forEach((l) => l(tags));
};

/** Tags each AI action affects. Course/Unit are included because course and progress queries embed chapters/lessons/questions. */
export const AI_RESOURCE_TAGS = {
  course: ["Course", "Chapter", "Lesson", "Unit", "Question"],
  chapter: ["Course", "Chapter", "Lesson"],
  lesson: ["Course", "Chapter", "Lesson"],
  question: ["Question", "Unit", "Lesson"],
} satisfies Record<string, AiResourceTag[]>;
