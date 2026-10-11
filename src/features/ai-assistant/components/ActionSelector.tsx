import React from "react";
import { Box, Typography, ButtonBase, Paper, Chip } from "@mui/material";
import { BookOpen, Layers, FileText, HelpCircle, ChevronRight, Sparkles } from "lucide-react";
import { AssistantAction } from "../types/aiAssistant.types";
import { ASSISTANT_ACTIONS, UPCOMING_ACTIONS } from "../constants/actions";

interface ActionSelectorProps {
  onSelectAction: (action: AssistantAction) => void;
}

export const ActionSelector: React.FC<ActionSelectorProps> = ({ onSelectAction }) => {
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }} data-testid="action-selector">
      <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
        Available Actions
      </Typography>

      {/* Primary Supported Action: CREATE_COURSE */}
      {ASSISTANT_ACTIONS.map((action) => (
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
            border: "1.5px solid #c7d2fe",
            background: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "#6366f1",
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
                bgcolor: "#4F39F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <BookOpen size={18} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e1b4b", fontSize: "14px" }}>
                  {action.label}
                </Typography>
                <Chip
                  label="AI Powered"
                  size="small"
                  icon={<Sparkles size={11} color="#4F39F6" />}
                  sx={{
                    height: 18,
                    fontSize: "10px",
                    fontWeight: 600,
                    bgcolor: "#ede9fe",
                    color: "#4F39F6",
                    "& .MuiChip-icon": { ml: "4px" },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#475569", fontSize: "12px", mt: 0.25, lineHeight: 1.35 }}>
                {action.description}
              </Typography>
            </Box>
          </Box>
          <ChevronRight size={18} color="#6366f1" />
        </Paper>
      ))}

      {/* Planned Future Actions (Extensible Architecture) */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Upcoming Capabilities
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
          {UPCOMING_ACTIONS.map((upcoming) => {
            const getIcon = () => {
              if (upcoming.id === "CREATE_CHAPTER") return <Layers size={16} />;
              if (upcoming.id === "CREATE_LESSON") return <FileText size={16} />;
              return <HelpCircle size={16} />;
            };

            return (
              <Box
                key={upcoming.id}
                sx={{
                  p: 1.25,
                  borderRadius: "10px",
                  border: "1px dashed #e2e8f0",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: 0.8,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "6px",
                      bgcolor: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                    }}
                  >
                    {getIcon()}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "12px", color: "#64748b" }}>
                      {upcoming.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "11px", display: "block" }}>
                      {upcoming.description}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={upcoming.badge}
                  size="small"
                  sx={{ height: 18, fontSize: "9px", bgcolor: "#f1f5f9", color: "#94a3b8" }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
