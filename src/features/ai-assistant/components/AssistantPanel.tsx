import React from "react";
import { Box, Paper, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  AssistantAction,
  CreateCourseInput,
} from "../types/aiAssistant.types";
import {
  selectAssistantIsOpen,
  selectSelectedAction,
  selectRequestStatus,
  selectAssistantError,
  selectAssistantResult,
  selectAssistantMessages,
  closeAssistant,
  selectAction,
  resetAssistantAction,
  generateCourseStructureStart,
  generateCourseStructureSuccess,
  generateCourseStructureFailure,
  clearAssistantError,
} from "../store/aiContext.slice";
import { useAssistantContext } from "../hooks/useAssistantContext";
import { generateCourseStructure } from "../services/aiAssistant.api";
import { AssistantHeader } from "./AssistantHeader";
import { MessageList } from "./MessageList";
import { ActionSelector } from "./ActionSelector";
import { DynamicInputForm } from "./DynamicInputForm";

export const AssistantPanel: React.FC = () => {
  const dispatch = useDispatch();
  const context = useAssistantContext();

  const isOpen = useSelector(selectAssistantIsOpen);
  const selectedAction = useSelector(selectSelectedAction);
  const requestStatus = useSelector(selectRequestStatus);
  const error = useSelector(selectAssistantError);
  const result = useSelector(selectAssistantResult);
  const messages = useSelector(selectAssistantMessages);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeAssistant());
  };

  const handleSelectAction = (action: AssistantAction) => {
    dispatch(selectAction(action));
  };

  const handleBackToActionSelector = () => {
    dispatch(resetAssistantAction());
  };

  const handleCreateCourseSubmit = async (values: CreateCourseInput) => {
    try {
      dispatch(clearAssistantError());
      dispatch(generateCourseStructureStart());

      const apiResult = await generateCourseStructure(values);
      dispatch(generateCourseStructureSuccess(apiResult));
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        "An unexpected error occurred while generating the course structure. Please try again.";
      dispatch(generateCourseStructureFailure(errorMessage));
    }
  };

  const handleResetResult = () => {
    dispatch(resetAssistantAction());
  };

  return (
    <Paper
      elevation={12}
      data-testid="assistant-panel"
      sx={{
        position: "fixed",
        bottom: { xs: 16, sm: 84 },
        right: { xs: 16, sm: 24 },
        width: { xs: "calc(100vw - 32px)", sm: 420 },
        maxHeight: { xs: "calc(100vh - 100px)", sm: 620 },
        height: { xs: 580, sm: 600 },
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: 1300,
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header */}
      <AssistantHeader
        selectedAction={selectedAction}
        pageType={context.pageType}
        onClose={handleClose}
        onBackToActionSelector={handleBackToActionSelector}
      />

      {/* Messages area */}
      <MessageList messages={messages} />

      <Divider sx={{ borderColor: "#f1f5f9" }} />

      {/* Action Selector or Form depending on state */}
      <Box
        sx={{
          maxHeight: 340,
          overflowY: "auto",
          bgcolor: "#fcfdfe",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        {!selectedAction ? (
          <ActionSelector onSelectAction={handleSelectAction} />
        ) : (
          <DynamicInputForm
            selectedAction={selectedAction}
            isLoading={requestStatus === "loading"}
            error={error}
            result={result}
            onSubmit={handleCreateCourseSubmit}
            onCancel={handleBackToActionSelector}
            onResetResult={handleResetResult}
          />
        )}
      </Box>
    </Paper>
  );
};
