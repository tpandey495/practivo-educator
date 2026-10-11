import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { Sparkles, X, ArrowLeft } from "lucide-react";
import { AssistantAction, PageType } from "../types/aiAssistant.types";

interface AssistantHeaderProps {
  selectedAction: AssistantAction | null;
  pageType: PageType;
  onClose: () => void;
  onBackToActionSelector: () => void;
}

export const AssistantHeader: React.FC<AssistantHeaderProps> = ({
  selectedAction,
  pageType,
  onClose,
  onBackToActionSelector,
}) => {
  const getPageContextLabel = () => {
    switch (pageType) {
      case "courses":
        return "Courses";
      case "questions":
        return "Questions";
      default:
        return "Portal";
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e2e8f0",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      }}
      data-testid="assistant-header"
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
        {selectedAction && (
          <IconButton
            size="small"
            onClick={onBackToActionSelector}
            aria-label="Back to action selection"
            sx={{
              color: "#64748b",
              p: 0.5,
              "&:hover": { color: "#1e293b", bgcolor: "#f1f5f9" },
            }}
          >
            <ArrowLeft size={18} />
          </IconButton>
        )}

        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 2px 8px rgba(79, 57, 246, 0.25)",
          }}
        >
          <Sparkles size={18} />
        </Box>

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#0f172a",
                lineHeight: 1.2,
              }}
            >
              Practivo AI
            </Typography>
            <Chip
              label={getPageContextLabel()}
              size="small"
              sx={{
                height: 18,
                fontSize: "10px",
                fontWeight: 500,
                bgcolor: "#e0e7ff",
                color: "#4338ca",
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              fontSize: "11px",
              display: "block",
            }}
          >
            {selectedAction === "CREATE_COURSE"
              ? "Create Course Workflow"
              : "Intelligent Admin Assistant"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close assistant"
          sx={{
            color: "#64748b",
            p: 0.75,
            "&:hover": { color: "#0f172a", bgcolor: "#f1f5f9" },
          }}
        >
          <X size={18} />
        </IconButton>
      </Box>
    </Box>
  );
};
