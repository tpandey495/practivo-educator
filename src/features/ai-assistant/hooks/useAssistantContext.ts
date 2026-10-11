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

  // Determine page type
  let pageType: PageType = "unknown";
  if (pathname.includes("/questions") || pathname.includes("edit/questions")) {
    pageType = "questions";
  } else if (pathname.startsWith("/courses") || pathname === "/") {
    pageType = "courses";
  }

  // Available actions for the initial release: CREATE_COURSE only
  const availableActions: AssistantAction[] = ["CREATE_COURSE"];

  return {
    pathname,
    searchParams: searchParamsObj,
    pageType,
    availableActions,
  };
}

export function useAssistantContext(): AssistantContext {
  const location = useLocation();

  return useMemo(() => {
    return resolveAssistantContext(location.pathname, location.search);
  }, [location.pathname, location.search]);
}
