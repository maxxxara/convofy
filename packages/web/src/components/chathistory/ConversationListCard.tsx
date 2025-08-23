import React, { useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "@/lib/date-utils";
import type { SessionGetAll } from "@/utils/types";

function ConversationListCard({
  session,
  selectedSession,
  setSelectedSession,
  currentUserId,
}: {
  session: SessionGetAll;
  selectedSession: SessionGetAll | null;
  setSelectedSession: (session: SessionGetAll) => void;
  currentUserId: string;
}) {
  const isSelected = useMemo(
    () => selectedSession?.sessions.id === session.sessions.id,
    [selectedSession, session]
  );

  return (
    <Card
      key={session.sessions.id}
      className={cn(
        "py-[8px] cursor-pointer transition-colors hover:bg-slate-50 border-slate-200",
        isSelected
          ? "bg-blue-50 border-blue-200"
          : "hover:bg-slate-50 border-slate-200",
        session.sessions.badge === "SUPPORT_REQUESTED" &&
          "bg-red-50 border-red-200"
      )}
      onClick={() => setSelectedSession(session)}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={session.bot_configs?.avatar ?? ""} />
            <AvatarFallback className="text-sm">
              {(() => {
                const name = session.bot_configs?.name || "";
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
          <div className="flex-1 min-w-0 max-w-[180px]">
            <p className="text-xs text-muted-foreground truncate mb-1">
              {session.bot_configs?.name}
            </p>
            {session.sessions.lastMessage && (
              <p className="text-xs text-slate-600 truncate mb-1">
                {session.sessions.lastMessage}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {formatDistanceToNow(session.sessions.updatedAt, {
                  addSuffix: true,
                })}
              </span>
            </div>
            {/* Support Assignment Indicator */}
            <div className="mt-2 flex items-center gap-2">
              {session.sessions.badge === "SUPPORT_REQUESTED" ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-red-700 font-medium">
                    Support requested
                  </span>
                </div>
              ) : session.sessions.supportId ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-700 font-medium">
                    Assigned to{" "}
                    {session.sessions.supportId === currentUserId
                      ? "you"
                      : session.users?.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-orange-700 font-medium">
                    Unassigned
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConversationListCard;
