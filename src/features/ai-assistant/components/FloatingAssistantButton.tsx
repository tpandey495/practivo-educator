import React from "react";
import { Fab, Tooltip, Zoom, Box } from "@mui/material";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAssistantIsOpen, toggleAssistant } from "../store/aiContext.slice";
import { useAuth } from "../../../hooks/useAuth";

export const FloatingAssistantButton: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAssistantIsOpen);
  const { isAdmin } = useAuth();

  // Admin-only access guard: hide UI if not an authorized administrator
  if (!isAdmin) {
    return null;
  }

  const handleToggle = () => {
    dispatch(toggleAssistant());
  };

  return (
    <Tooltip
      title={isOpen ? "Close AI Assistant" : "Open AI Assistant (Create Course)"}
      placement="left"
      arrow
    >
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="AI Assistant"
          onClick={handleToggle}
          data-testid="floating-assistant-btn"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            zIndex: 1250,
            background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            boxShadow: "0 8px 24px rgba(79, 57, 246, 0.45)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #3E2DC4 0%, #7C3AED 100%)",
              transform: "scale(1.06)",
              boxShadow: "0 12px 30px rgba(79, 57, 246, 0.6)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease-in-out",
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </Box>
        </Fab>
      </Zoom>
    </Tooltip>
  );
};
