import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder?: string;
  onBlur?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Type your message...",
  onBlur,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && value.trim()) {
      onSubmit();
    }
  };

  const isSubmitDisabled = disabled || !value.trim();

  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        borderTop: "1px solid rgba(229, 231, 235, 0.8)",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
              onBlur?.();
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          style={{
            padding: "12px 16px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "12px",
            cursor: isSubmitDisabled ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            transition: "all 0.2s",
            opacity: isSubmitDisabled ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitDisabled) {
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(59, 130, 246, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(59, 130, 246, 0.3)";
          }}
        >
          <Send
            style={{
              width: "20px",
              height: "20px",
              color: "white",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
