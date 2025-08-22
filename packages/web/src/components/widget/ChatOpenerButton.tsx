import React from "react";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

const ChatOpenerButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        background: "#3b82f6",
        border: "none",
        cursor: "pointer",
        boxShadow:
          "0 10px 25px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow =
          "0 20px 40px rgba(59, 130, 246, 0.4), 0 8px 24px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
    >
      <MessageCircle
        style={{ width: "28px", height: "28px", color: "white" }}
      />
      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "16px",
          height: "16px",
          background: "#10b981",
          borderRadius: "50%",
          border: "2px solid white",
          animation: "convofy-pulse 2s infinite",
        }}
      />
    </button>
  );
};

export default ChatOpenerButton;
