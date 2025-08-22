import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  message,
}) => {
  const isLarge = size === "large";
  const spinnerSize = isLarge ? "32px" : "24px";
  const borderWidth = isLarge ? "3px" : "2px";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: isLarge ? "32px 0" : "20px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: spinnerSize,
            height: spinnerSize,
            border: `${borderWidth} solid #3b82f6`,
            borderTop: `${borderWidth} solid transparent`,
            borderRadius: "50%",
            animation: "convofy-spin 1s linear infinite",
          }}
        />
        <p
          style={{
            fontSize: isLarge ? "14px" : "12px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
