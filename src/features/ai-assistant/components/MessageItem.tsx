import React from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { Bot, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { AssistantMessage } from "../types/aiAssistant.types";

interface MessageItemProps {
  message: AssistantMessage;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAssistant = message.sender === "assistant";
  const isUser = message.sender === "user";

  const renderDataPreview = () => {
    if (!message.data) return null;
    const data = message.data as any;
    const courseStructure = data?.courseStructure || data;
    const chapters = courseStructure?.chapters || [];

    if (!Array.isArray(chapters) || chapters.length === 0) {
      return (
        <Box
          sx={{
            mt: 1.5,
            p: 1.5,
            borderRadius: "8px",
            background: "#f1f5f9",
            fontSize: "12px",
            color: "#334155",
          }}
        >
          {data?.message || "Course structure generated and ready."}
        </Box>
      );
    }

    return (
      <Paper
        elevation={0}
        sx={{
          mt: 1.5,
          p: 1.5,
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          background: "#ffffff",
          maxHeight: 220,
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "#1e293b" }}>
            Generated Curriculum ({chapters.length} Chapters)
          </Typography>
          <Chip label="AI Generated" size="small" sx={{ height: 18, fontSize: "10px", bgcolor: "#ede9fe", color: "#6d28d9" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {chapters.map((chap: any, idx: number) => (
            <Box
              key={idx}
              sx={{
                p: 1,
                borderRadius: "6px",
                background: "#f8fafc",
                border: "1px solid #edf2f7",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "12px", color: "#0f172a" }}>
                Chapter {idx + 1}: {chap.title || chap.chapterName || `Chapter ${idx + 1}`}
              </Typography>
              {chap.lessons && (
                <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                  {chap.lessons.length} lessons planned
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 1.25,
        mb: 1.5,
      }}
      data-testid={`message-${message.id}`}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: isAssistant
            ? "linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)"
            : "#0f172a",
          color: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </Box>

      {/* Message bubble */}
      <Box
        sx={{
          maxWidth: "82%",
          p: 1.5,
          borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          backgroundColor: isUser
            ? "#4F39F6"
            : message.status === "error"
            ? "#fef2f2"
            : message.status === "success"
            ? "#f0fdf4"
            : "#f8fafc",
          border: isUser
            ? "none"
            : message.status === "error"
            ? "1px solid #fecaca"
            : message.status === "success"
            ? "1px solid #bbf7d0"
            : "1px solid #e2e8f0",
          color: isUser
            ? "#ffffff"
            : message.status === "error"
            ? "#991b1b"
            : message.status === "success"
            ? "#166534"
            : "#1e293b",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25 }}>
          {message.status === "error" && <AlertCircle size={14} color="#dc2626" />}
          {message.status === "success" && <CheckCircle2 size={14} color="#16a34a" />}
          <Typography
            variant="body2"
            sx={{
              fontSize: "13px",
              lineHeight: 1.45,
              wordBreak: "break-word",
            }}
          >
            {message.text}
          </Typography>
        </Box>

        {renderDataPreview()}

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            fontSize: "10px",
            textAlign: isUser ? "right" : "left",
            opacity: 0.7,
            color: isUser ? "#e0e7ff" : "#64748b",
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Box>
  );
};
