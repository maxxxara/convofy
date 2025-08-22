import React from "react";
import type { Message } from "./widget.types";

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          padding: "12px 16px",
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          background: "#3b82f6",
          color: "white",
          marginLeft: "16px",
          borderBottomRightRadius: "4px",
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

export default UserMessage;
