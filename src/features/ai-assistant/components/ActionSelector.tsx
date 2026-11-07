import React from "react";
import { Box, Typography, ButtonBase, Paper, Chip } from "@mui/material";
import {
  Layers,
  FileText,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Youtube,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { AssistantAction } from "../types/aiAssistant.types";
import { ALL_ASSISTANT_ACTIONS } from "../constants/actions";
import { useAssistantContext } from "../hooks/useAssistantContext";

interface ActionSelectorProps {
  onSelectAction: (action: AssistantAction) => void;
}

export const ActionSelector: React.FC<ActionSelectorProps> = ({ onSelectAction }) => {
  const { availableActions, pageType } = useAssistantContext();

  const getActionIcon = (id: AssistantAction) => {
    switch (id) {
      case "CREATE_COURSE_STRUCTURE":
        return <Youtube size={18} />;
      case "CREATE_COURSE_WORKFLOW":
      case "CREATE_COURSE_WITH_QUESTIONS":
        return <ListChecks size={18} />;
      case "CREATE_CHAPTER":
        return <Layers size={18} />;
      case "CREATE_LESSON":
        return <FileText size={18} />;
      case "CREATE_QUESTIONS":
        return <HelpCircle size={18} />;
      case "CREATE_COURSE":
      default:
        return <BookOpen size={18} />;
    }
  };

  const getActionColors = (id: AssistantAction) => {
    switch (id) {
      case "CREATE_COURSE_STRUCTURE":
        return {
          iconBg: "#dc2626",
          border: "#fca5a5",
          hoverBorder: "#ef4444",
          chipBg: "#fee2e2",
          chipColor: "#b91c1c",
          bg: "linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)",
        };
      case "CREATE_COURSE_WORKFLOW":
      case "CREATE_COURSE_WITH_QUESTIONS":
        return {
          iconBg: "#7c3aed",
          border: "#d8b4fe",
          hoverBorder: "#8b5cf6",
          chipBg: "#f3e8ff",
          chipColor: "#7e22ce",
          bg: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
        };
      case "CREATE_CHAPTER":
        return {
          iconBg: "#d97706",
          border: "#fde68a",
          hoverBorder: "#f59e0b",
          chipBg: "#fef3c7",
          chipColor: "#92400e",
          bg: "linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)",
        };
      case "CREATE_LESSON":
        return {
          iconBg: "#0284c7",
          border: "#bae6fd",
          hoverBorder: "#0ea5e9",
          chipBg: "#e0f2fe",
          chipColor: "#0369a1",
          bg: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
        };
      case "CREATE_QUESTIONS":
        return {
          iconBg: "#059669",
          border: "#a7f3d0",
          hoverBorder: "#10b981",
          chipBg: "#d1fae5",
          chipColor: "#065f46",
          bg: "linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)",
        };
      case "CREATE_COURSE":
      default:
        return {
          iconBg: "#4F39F6",
          border: "#c7d2fe",
          hoverBorder: "#6366f1",
          chipBg: "#ede9fe",
          chipColor: "#4F39F6",
          bg: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
        };
    }
  };

  const getSectionTitle = () => {
    switch (pageType) {
      case "courses":
        return "Course Creation (3 Options)";
      case "course_edit":
        return "Curriculum Management";
      case "questions":
        return "Question Management";
      default:
        return "Available Actions";
    }
  };

  // Filter actions based on the current context page
  // On courses page: display only CREATE_COURSE, CREATE_COURSE_WORKFLOW, CREATE_COURSE_STRUCTURE
  // Deduplicate CREATE_COURSE_WORKFLOW / CREATE_COURSE_WITH_QUESTIONS
  const displayedActions = ALL_ASSISTANT_ACTIONS.filter((action) => {
    if (!availableActions.includes(action.id)) {
      return false;
    }
    // If on courses page, only show CREATE_COURSE, CREATE_COURSE_WORKFLOW, CREATE_COURSE_STRUCTURE
    if (pageType === "courses") {
      if (action.id === "CREATE_COURSE_WITH_QUESTIONS") {
        return false; // Represented by CREATE_COURSE_WORKFLOW
      }
      return ["CREATE_COURSE", "CREATE_COURSE_WORKFLOW", "CREATE_COURSE_STRUCTURE"].includes(
        action.id
      );
    }
    return true;
  });

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }} data-testid="action-selector">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {getSectionTitle()}
        </Typography>
        <Chip
          label={`${displayedActions.length} ${displayedActions.length === 1 ? "Option" : "Options"}`}
          size="small"
          sx={{ height: 18, fontSize: "10px", fontWeight: 600, bgcolor: "#f1f5f9", color: "#475569" }}
        />
      </Box>

      {/* Context-aware Actions */}
      {displayedActions.map((action) => {
        const colors = getActionColors(action.id);
        return (
          <Paper
            key={action.id}
            elevation={0}
            component={ButtonBase}
            onClick={() => onSelectAction(action.id)}
            data-testid={`action-btn-${action.id}`}
            sx={{
              width: "100%",
              p: 1.75,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "left",
              borderRadius: "12px",
              border: `1.5px solid ${colors.border}`,
              background: colors.bg,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: colors.hoverBorder,
                transform: "translateY(-1px)",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.15)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mr: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: colors.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                {getActionIcon(action.id)}
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0f172a", fontSize: "13.5px" }}>
                    {action.label}
                  </Typography>
                  {action.badge && (
                    <Chip
                      label={action.badge}
                      size="small"
                      icon={
                        action.id === "CREATE_COURSE_STRUCTURE" ? (
                          <Youtube size={11} color={colors.chipColor} />
                        ) : (
                          <Sparkles size={11} color={colors.chipColor} />
                        )
                      }
                      sx={{
                        height: 18,
                        fontSize: "10px",
                        fontWeight: 600,
                        bgcolor: colors.chipBg,
                        color: colors.chipColor,
                        "& .MuiChip-icon": { ml: "4px" },
                      }}
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: "#475569", fontSize: "12px", mt: 0.25, lineHeight: 1.35 }}>
                  {action.description}
                </Typography>
              </Box>
            </Box>
            <ChevronRight size={18} color="#6366f1" />
          </Paper>
        );
      })}
    </Box>
  );
};
