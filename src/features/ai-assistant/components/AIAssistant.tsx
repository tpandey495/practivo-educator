import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { FloatingAssistantButton } from "./FloatingAssistantButton";
import { AssistantPanel } from "./AssistantPanel";

export const AIAssistant: React.FC = () => {
  const { isAdmin } = useAuth();

  // Admin-only access enforcement
  if (!isAdmin) {
    return null;
  }

  return (
    <Box data-testid="ai-assistant-container">
      <FloatingAssistantButton />
      <AssistantPanel />
    </Box>
  );
};
