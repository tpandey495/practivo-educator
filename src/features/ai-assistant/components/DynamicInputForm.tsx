import React from "react";
import { Box, Typography } from "@mui/material";
import {
  AssistantAction,
  CreateCoursePayload,
  PlaylistCoursePayload,
} from "../types/aiAssistant.types";
import { CreateCourseForm } from "./CreateCourseForm";
import { CreateChapterForm } from "./CreateChapterForm";
import { CreateLessonForm } from "./CreateLessonForm";
import { CreateQuestionForm } from "./CreateQuestionForm";

interface DynamicInputFormProps {
  selectedAction: AssistantAction | null;
  isLoading: boolean;
  error: string | null;
  result: any | null;
  onSubmit: (payload: CreateCoursePayload | PlaylistCoursePayload) => Promise<void> | void;
  onCancel: () => void;
  onResetResult?: () => void;
}

export const DynamicInputForm: React.FC<DynamicInputFormProps> = ({
  selectedAction,
  isLoading,
  error,
  result,
  onSubmit,
  onCancel,
  onResetResult,
}) => {
  if (!selectedAction) {
    return null;
  }

  switch (selectedAction) {
    case "CREATE_COURSE":
    case "CREATE_COURSE_STRUCTURE":
      return (
        <CreateCourseForm
          initialMode="structure_only"
          selectedAction={selectedAction}
          isLoading={isLoading}
          error={error}
          result={result}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onResetResult={onResetResult}
        />
      );

    case "CREATE_COURSE_WORKFLOW":
    case "CREATE_COURSE_WITH_QUESTIONS":
      return (
        <CreateCourseForm
          initialMode="structure_with_questions"
          selectedAction={selectedAction}
          isLoading={isLoading}
          error={error}
          result={result}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onResetResult={onResetResult}
        />
      );

    case "CREATE_CHAPTER":
      return (
        <CreateChapterForm
          onCancel={onCancel}
          onResetResult={onResetResult}
        />
      );

    case "CREATE_LESSON":
      return (
        <CreateLessonForm
          onCancel={onCancel}
          onResetResult={onResetResult}
        />
      );

    case "CREATE_QUESTIONS":
      return (
        <CreateQuestionForm
          onCancel={onCancel}
          onResetResult={onResetResult}
        />
      );

    default:
      return (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            The selected action is not yet implemented.
          </Typography>
        </Box>
      );
  }
};
