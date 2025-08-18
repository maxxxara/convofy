import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

interface WidgetConfig {
  botId: string;
}

interface ChatWidgetProps {
  config: WidgetConfig;
}

const apiUrl = "http://localhost:8080/api";

const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { botId } = config;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initSession = async () => {
    try {
      setIsLoading(true);

      // Get existing session from localStorage
      const existingSessionId = localStorage.getItem(`convofy-session`);

      const response = await fetch(`${apiUrl}/widget.initSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botId: botId,
          sessionId: existingSessionId || undefined,
          userId: `widget-${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize session");
      }

      const data = await response.json();
      setSessionId(data.result.data.sessionId);

      localStorage.setItem(`convofy-session`, data.result.data.sessionId);
      console.log("data", data);
      // Add welcome message
      setMessages([
        {
          id: "welcome",
          role: "ASSISTANT",
          content: data.result.data.welcomeMessage,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Failed to initialize session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!sessionId || !message.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "USER",
      content: message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch(`${apiUrl}/api/widget.sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botId,
          sessionId,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "ASSISTANT",
        content: data.result.data.message,
        createdAt: data.result.data.timestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "ASSISTANT",
        content:
          "Sorry, I'm having trouble responding right now. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const toggleWidget = () => {
    if (!isOpen && !sessionId) {
      initSession();
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <>
      <style>{`
        @keyframes convofy-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes convofy-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes convofy-bounce {
          0%, 80%, 100% { 
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          40% { 
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .convofy-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .convofy-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .convofy-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }
        .convofy-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {/* Chat Button */}
        {!isOpen && (
          <button
            onClick={toggleWidget}
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
        )}

        {/* Chat Window */}
        {isOpen && (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(229, 231, 235, 0.5)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              width: "400px",
              height: isMinimized ? "64px" : "520px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Header */}
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
                    C
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
                </div>
                <div>
                  <h3
                    style={{ fontWeight: "600", fontSize: "16px", margin: 0 }}
                  >
                    Convofy Assistant
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
              <div
                style={{ position: "relative", display: "flex", gap: "8px" }}
              >
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
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
                    (e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Minimize2 style={{ width: "16px", height: "16px" }} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
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
                    (e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <X style={{ width: "16px", height: "16px" }} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "32px 0",
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
                              width: "32px",
                              height: "32px",
                              border: "3px solid #3b82f6",
                              borderTop: "3px solid transparent",
                              borderRadius: "50%",
                              animation: "convofy-spin 1s linear infinite",
                            }}
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#6b7280",
                              margin: 0,
                            }}
                          >
                            Connecting to assistant...
                          </p>
                        </div>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        style={{
                          display: "flex",
                          justifyContent:
                            message.role === "USER" ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "85%",
                            padding: "12px 16px",
                            borderRadius: "16px",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            ...(message.role === "USER"
                              ? {
                                  background: "#3b82f6",
                                  color: "white",
                                  marginLeft: "16px",
                                  borderBottomRightRadius: "4px",
                                }
                              : {
                                  background: "white",
                                  border: "1px solid #e5e7eb",
                                  color: "#1f2937",
                                  marginRight: "16px",
                                  borderBottomLeftRadius: "4px",
                                }),
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
                    ))}

                    {isTyping && (
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
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                <div
                  style={{
                    padding: "20px",
                    background: "white",
                    borderTop: "1px solid rgba(229, 231, 235, 0.8)",
                  }}
                >
                  <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", gap: "12px" }}
                  >
                    <div style={{ flex: 1, position: "relative" }}>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading || !sessionId}
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
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !sessionId || !inputValue.trim()}
                      style={{
                        padding: "12px 16px",
                        background: "#3b82f6",
                        border: "none",
                        borderRadius: "12px",
                        cursor:
                          isLoading || !sessionId || !inputValue.trim()
                            ? "not-allowed"
                            : "pointer",
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                        transition: "all 0.2s",
                        opacity:
                          isLoading || !sessionId || !inputValue.trim()
                            ? 0.5
                            : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading && sessionId && inputValue.trim()) {
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
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
