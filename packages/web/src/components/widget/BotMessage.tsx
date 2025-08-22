import React from "react";
import type { Message } from "./widget.types";

interface BotMessageProps {
  message: Message;
}

const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "12px 16px",
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          // SUPPORT and ASSISTANT messages both render as bot messages
          background: "white",
          border: "1px solid #e5e7eb",
          color: "#1f2937",
          marginRight: "16px",
          borderBottomLeftRadius: "4px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            margin: 0,
          }}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default BotMessage;
