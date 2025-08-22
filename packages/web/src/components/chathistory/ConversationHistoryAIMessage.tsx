import type { SessionMessage, SessionSupportUser } from "@/utils/types";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "@/lib/date-utils";

function ConversationHistoryAIMessage({
  msg,
  supportUser,
}: {
  msg: SessionMessage;
  supportUser: SessionSupportUser | null;
}) {
  return (
    <div key={msg.id} className={`flex gap-3 justify-end`}>
      <div className={`flex-1 max-w-[70%]`}>
        <div className={`p-3 rounded-lg bg-slate-100 border border-slate-200`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {msg.content}
          </p>
        </div>
        <div className={`text-xs text-muted-foreground mt-1`}>
          {formatDistanceToNow(msg.createdAt, {
            addSuffix: true,
          })}
        </div>
      </div>
      <div className="flex-shrink-0">
        {supportUser ? (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
            <Avatar>
              <AvatarImage src={supportUser.avatar || ""} />
              <AvatarFallback>
                {(() => {
                  const name = supportUser.name + " " + supportUser.surname;
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
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversationHistoryAIMessage;
