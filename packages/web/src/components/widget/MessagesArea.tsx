import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import LoadingSpinner from "./LoadingSpinner";
import type { SessionMessage } from "@/utils/types";

interface MessagesAreaProps {
  messages: SessionMessage[];
  isLoading: boolean;
  isFetchingMessages: boolean;
  isTyping: boolean;
}

const MessagesArea: React.FC<MessagesAreaProps> = ({
  messages,
  isLoading,
  isFetchingMessages,
  isTyping,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="convofy-scrollbar"
      style={{
        flex: 1,
        padding: "20px",
        background: "#f9fafb",
        overflowY: "auto",
        maxHeight: "360px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {isLoading && (
          <LoadingSpinner size="large" message="Connecting to assistant..." />
        )}

        {isFetchingMessages && (
          <LoadingSpinner size="small" message="Loading conversation..." />
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesArea;
