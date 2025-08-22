import React from "react";
import { X, Minimize2, Plus, Loader2 } from "lucide-react";
import type { SessionGetAll } from "@/utils/types";

interface ChatHeaderProps {
  onClose: () => void;
  handleCreateNewSession: () => void;
  isCreateNewSessionPending: boolean;
  activeSession: SessionGetAll | null;
}

const Avatar = ({ avatarUrl, name }: { avatarUrl: string; name: string }) => {
  return (
    <>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ) : (
        <>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {name?.charAt(0)}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-4px",
              right: "-4px",
              width: "16px",
              height: "16px",
              background: "#10b981",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </>
      )}
    </>
  );
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClose,
  handleCreateNewSession,
  isCreateNewSessionPending,
  activeSession,
}) => {
  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#1e293b",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(59, 130, 246, 0.15)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ position: "relative" }}>
          {activeSession?.users ? (
            <Avatar
              avatarUrl={activeSession?.users?.avatar || ""}
              name={activeSession?.users?.name || ""}
            />
          ) : (
            <Avatar
              avatarUrl={activeSession?.bot_configs?.avatar || ""}
              name={activeSession?.bot_configs?.name || ""}
            />
          )}
        </div>
        <div>
          <h3 style={{ fontWeight: "600", fontSize: "16px", margin: 0 }}>
            {activeSession?.users
              ? activeSession?.users?.name
              : activeSession?.bot_configs?.name + " Assistant"}
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              margin: 0,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#10b981",
                borderRadius: "50%",
              }}
            />
            Online now
          </p>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", gap: "8px" }}>
        <button
          onClick={handleCreateNewSession}
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            padding: "8px",
            height: "36px",
            width: "36px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {isCreateNewSessionPending ? (
            <Loader2 style={{ width: "16px", height: "16px" }} />
          ) : (
            <Plus style={{ width: "16px", height: "16px" }} />
          )}
        </button>
        <button
          onClick={onClose}
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            padding: "8px",
            height: "36px",
            width: "36px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <X style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
