import { useMemo, useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Loader2, Send } from "lucide-react";
import ConversationHistoryUserMessage from "./ConversationHistoryUserMessage";
import ConversationHistoryAIMessage from "./ConversationHistoryAIMessage";
import { trpc } from "@/utils/trpc";
import type { SessionGetAll, SessionMessage } from "@/utils/types";

function ConversationHistoryChat({
  selectedSession,
  setSelectedSession,
}: {
  selectedSession: SessionGetAll;
  setSelectedSession: (session: SessionGetAll) => void;
}) {
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const trpcUtils = trpc.useUtils();
  const { data: currentUser } = trpc.user.getCurrentUser.useQuery();
  const { data: fetchedMessages, isLoading: isLoadingMessages } =
    trpc.session.getSessionMessages.useQuery({
      sessionId: selectedSession.sessions.id,
    });
  const messages = useMemo(() => {
    return fetchedMessages?.map((msg) => ({
      ...msg,
      createdAt: new Date(msg.createdAt),
    }));
  }, [fetchedMessages]);
  const { mutateAsync: updateSession } = trpc.session.update.useMutation();
  const { mutateAsync: sendMessage } = trpc.session.sendMessage.useMutation();

  // Scroll to bottom when messages change or when opening a chat
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, selectedSession.sessions.id]);

  const handleSendMessage = async () => {
    if (!currentUser?.id) {
      return;
    }
    if (message.trim()) {
      await sendMessage({
        sessionId: selectedSession.sessions.id,
        message: message,
        fromSupport: true,
      });
      await trpcUtils.session.getSessionMessages.invalidate({
        sessionId: selectedSession.sessions.id,
      });

      setMessage("");
    }
  };

  const handleTakeLead = async () => {
    if (!currentUser?.id) {
      return;
    }
    const updatedSession = await updateSession({
      sessionId: selectedSession.sessions.id,
      supportId: currentUser?.id,
    });
    await trpcUtils.session.getAll.invalidate();

    // Update the selected session with the new support assignment
    setSelectedSession({
      ...selectedSession,
      sessions: {
        ...updatedSession,
      },
    });
  };

  const canTakeLead = useMemo(() => {
    return (
      !selectedSession.sessions.supportId ||
      (selectedSession.sessions.supportId &&
        selectedSession.sessions.supportId !== currentUser?.id)
    );
  }, [selectedSession, currentUser]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Chat Header */}
      <div className="border-b border-slate-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedSession.bot_configs?.avatar ?? ""} />
              <AvatarFallback>
                {(() => {
                  const name = selectedSession.bot_configs?.name || "";
                  const words = name.trim().split(/\s+/);
                  if (words.length >= 2) {
                    // Two or more words: take first letter of first two words
                    return (words[0][0] + words[1][0]).toUpperCase();
                  } else {
                    // One word: take first 2 letters
                    return name.slice(0, 2).toUpperCase();
                  }
                })()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium">User name 123</p>
                <Badge variant="outline" className="text-xs">
                  {selectedSession.bot_configs?.name}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Support Assignment Status */}
            <div className="flex items-center gap-2">
              {selectedSession.sessions.supportId ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-700 font-medium">
                    {selectedSession.sessions.supportId === currentUser?.id
                      ? "Assigned to you"
                      : `Assigned to ${selectedSession.users?.name}`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-orange-700 font-medium">
                    Unassigned
                  </span>
                </div>
              )}
            </div>

            {canTakeLead && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTakeLead()}
              >
                Take Lead
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 p-4">
        <div className="space-y-4">
          {isLoadingMessages ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : messages && messages.length > 0 ? (
            messages.map((msg: SessionMessage) => {
              if (msg.role === "USER") {
                return (
                  <ConversationHistoryUserMessage key={msg.id} msg={msg} />
                );
              } else if (msg.role === "ASSISTANT" || msg.role === "SUPPORT") {
                return (
                  <ConversationHistoryAIMessage
                    key={msg.id}
                    msg={msg}
                    supportUser={selectedSession.users}
                  />
                );
              }
            })
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No messages yet</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      {selectedSession.sessions.supportId === currentUser?.id ? (
        <div className="border-t border-slate-200 p-4 flex-shrink-0 items-center">
          <div className="flex gap-3 items-center">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[60px] resize-none max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-200 p-4 flex-shrink-0">
          <div className="text-center">
            <Button onClick={() => handleTakeLead()} className="px-6">
              Take Lead
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationHistoryChat;
