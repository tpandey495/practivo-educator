import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { AssistantMessage } from "../types/aiAssistant.types";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: AssistantMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === "function") {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
      data-testid="assistant-message-list"
    >
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};
