import React from "react";
import { Box, Typography } from "@mui/material";
import { AssistantAction, CreateCourseInput } from "../types/aiAssistant.types";
import { CreateCourseForm } from "./CreateCourseForm";

interface DynamicInputFormProps {
  selectedAction: AssistantAction | null;
  isLoading: boolean;
  error: string | null;
  result: any | null;
  onSubmit: (values: CreateCourseInput) => Promise<void> | void;
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
      return (
        <CreateCourseForm
          isLoading={isLoading}
          error={error}
          result={result}
          onSubmit={onSubmit}
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
