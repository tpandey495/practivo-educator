import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AssistantAction, AssistantContext, PageType } from "../types/aiAssistant.types";

/**
 * Resolves the current route context and available AI Assistant actions.
 */
export function resolveAssistantContext(pathname: string, search: string): AssistantContext {
  const searchParamsObj: Record<string, string> = {};
  try {
    const urlParams = new URLSearchParams(search);
    urlParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    });
  } catch {
    // Graceful fallback for non-browser / mock environments
  }

  // Extract courseId from pathname (e.g. /courses/edit/3 or /courses/3) or searchParams
  const courseMatch = pathname.match(/\/courses\/(?:edit\/)?(\d+)/);
  const pathCourseId = courseMatch ? courseMatch[1] : undefined;
  const courseId = searchParamsObj.courseId || pathCourseId;
  const lessonId = searchParamsObj.lessonId;

  // Determine page type and available actions based on context
  let pageType: PageType = "unknown";
  let availableActions: AssistantAction[] = [];

  // 1. Questions page (e.g. http://localhost:5173/courses/edit/questions?courseId=3&lessonId=9)
  if (
    pathname.includes("/questions") ||
    pathname.includes("edit/questions") ||
    (Boolean(searchParamsObj.lessonId) && pathname.includes("/courses"))
  ) {
    pageType = "questions";
    availableActions = ["CREATE_QUESTIONS"];
  }
  // 2. Course edit / chapters & lessons page (e.g. http://localhost:5173/courses/edit/3?tab=1)
  else if (
    pathname.match(/\/courses\/(?:edit\/)?\d+/) ||
    searchParamsObj.tab === "1" ||
    (Boolean(pathCourseId) && !pathname.includes("/questions"))
  ) {
    pageType = "course_edit";
    availableActions = ["CREATE_CHAPTER", "CREATE_LESSON"];
  }
  // 3. Courses page (e.g. http://localhost:5173/courses) - only 2 options: workflow & youtube
  else if (
    pathname === "/courses" ||
    pathname === "/courses/" ||
    pathname === "/" ||
    pathname.startsWith("/courses")
  ) {
    pageType = "courses";
    availableActions = [
      "CREATE_COURSE_WORKFLOW",
      "CREATE_COURSE_STRUCTURE",
    ];
  }
  // Fallback default
  else {
    pageType = "unknown";
    availableActions = [
      "CREATE_COURSE_WORKFLOW",
      "CREATE_COURSE_STRUCTURE",
    ];
  }

  return {
    pathname,
    searchParams: searchParamsObj,
    pageType,
    availableActions,
    courseId,
    lessonId,
  };
}

export function useAssistantContext(): AssistantContext {
  const location = useLocation();

  return useMemo(() => {
    return resolveAssistantContext(location.pathname, location.search);
  }, [location.pathname, location.search]);
}
