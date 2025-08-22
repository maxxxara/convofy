import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          padding: "12px 16px",
          borderRadius: "16px",
          borderBottomLeftRadius: "4px",
          marginRight: "16px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#3b82f6",
              borderRadius: "50%",
              animation: "convofy-bounce 1.4s infinite",
            }}
          />
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#3b82f6",
              borderRadius: "50%",
              animation: "convofy-bounce 1.4s infinite",
              animationDelay: "0.15s",
            }}
          />
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#3b82f6",
              borderRadius: "50%",
              animation: "convofy-bounce 1.4s infinite",
              animationDelay: "0.3s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
