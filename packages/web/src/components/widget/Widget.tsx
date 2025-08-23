import React, { useState, useEffect, useMemo, useRef } from "react";
import { trpc, trpcClient, queryClient } from "../../utils/trpc";
import type { WidgetProps } from "./widget.types";
import WidgetStyles from "./WidgetStyles";
import ChatOpenerButton from "./ChatOpenerButton";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import ChatInput from "./ChatInput";
import type { SessionGetAll, SessionMessage } from "@/utils/types";
import { useWidgetSubscriptions } from "./useWidgetSubscriptions";

const WidgetInner: React.FC<WidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [session, setSession] = useState<SessionGetAll | null>(null);
  const { botId } = config;
  const trpcUtils = trpc.useUtils();
  // tRPC mutations and queries
  const { mutateAsync: postInitSession, isPending: isInitSessionPending } =
    trpc.widget.initSession.useMutation();
  const {
    mutateAsync: createNewSession,
    isPending: isCreateNewSessionPending,
  } = trpc.widget.createNewSession.useMutation();
  const { mutateAsync: postSendMessage, isPending: isSendMessagePending } =
    trpc.widget.sendMessage.useMutation();
  const { mutateAsync: emitTyping } = trpc.session.emitTyping.useMutation();
  const { data: fetchedMessages, refetch: refetchMessages } =
    trpc.widget.getMessages.useQuery(
      {
        botId,
        sessionId: session?.sessions.id || "",
      },
      { enabled: !!session?.sessions.id }
    );
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isSupportTyping, setIsSupportTyping] = useState(false);
  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  const initSession = async () => {
    try {
      // Get existing session from localStorage
      const existingSessionId =
        localStorage.getItem(`convofy-session`) == "undefined"
          ? undefined
          : localStorage.getItem(`convofy-session`);

      const result = await postInitSession({
        botId,
        sessionId: existingSessionId || undefined,
        userId: `widget-${Date.now()}`,
      });

      setSession(result);
      localStorage.setItem(`convofy-session`, result.sessions.id);
      console.log("Session initialized:", result);

      refetchMessages();
    } catch (error) {
      console.error("Failed to initialize session:", error);
    }
  };

  const sendMessage = async () => {
    if (!session?.sessions.id || !inputValue.trim()) return;

    const messageContent = inputValue;
    setInputValue("");

    // Add user message optimistically with functional update
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "USER",
        content: messageContent,
        sessionId: session.sessions.id,
        isVisible: true,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    try {
      const newMessage = await postSendMessage({
        message: messageContent,
        sessionId: session.sessions.id,
      });
      console.log("New message:", newMessage);
      refetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleCreateNewSession = async () => {
    if (isCreateNewSessionPending) return;
    const result = await createNewSession({
      botId,
      userId: `widget-${Date.now()}`,
    });
    setSession(result);
    localStorage.setItem(`convofy-session`, result.sessions.id);
    refetchMessages();
  };

  const toggleWidget = () => {
    if (!isOpen && !session?.sessions.id) {
      initSession();
    }
    setIsOpen(!isOpen);
  };

  const widgetRef = useRef<HTMLDivElement>(null);

  const isFetchingMessages =
    fetchedMessages === undefined && !!session?.sessions.id;

  useWidgetSubscriptions({
    session,
    postInitSession,
    setSession,
    botId,
    refetchMessages,
    setIsTyping: setIsSupportTyping,
  });

  // Send event when user is typing
  useEffect(() => {
    if (inputValue.length > 0) {
      if (isUserTyping) return;
      emitTyping({
        sessionId: session?.sessions.id || "",
        who: "user",
        isTyping: true,
      });
      setIsUserTyping(true);
    } else {
      if (!isUserTyping) return;
      emitTyping({
        sessionId: session?.sessions.id || "",
        who: "user",
        isTyping: false,
      });
      setIsUserTyping(false);
    }
  }, [inputValue]);

  return (
    <>
      <WidgetStyles />
      <div
        ref={widgetRef}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        {!isOpen && <ChatOpenerButton onClick={toggleWidget} />}

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
              height: "520px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ChatHeader
              onClose={() => setIsOpen(false)}
              handleCreateNewSession={handleCreateNewSession}
              isCreateNewSessionPending={isCreateNewSessionPending}
              activeSession={session}
            />

            <MessagesArea
              messages={messages || []}
              isLoading={session === null}
              isFetchingMessages={isFetchingMessages}
              isTyping={isSupportTyping}
            />
            <ChatInput
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              onSubmit={sendMessage}
              disabled={isSendMessagePending || !session?.sessions.id}
              onBlur={() => {
                if (isUserTyping && session?.sessions.id) {
                  emitTyping({
                    sessionId: session.sessions.id,
                    who: "user",
                    isTyping: false,
                  });
                  setIsUserTyping(false);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

// Wrapper component with tRPC provider
const Widget: React.FC<WidgetProps> = ({ config }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <WidgetInner config={config} />
    </trpc.Provider>
  );
};

export default Widget;
