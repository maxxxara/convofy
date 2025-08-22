import { formatDistanceToNow } from "@/lib/date-utils";
import type { SessionMessage, SessionSupportUser } from "@/utils/types";

function ConversationHistoryUserMessage({ msg }: { msg: SessionMessage }) {
  return (
    <div key={msg.id} className={`flex gap-3`}>
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100">
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-xs text-slate-600 font-medium">U</span>
          </div>
        </div>
      </div>
      <div className={`flex-1 max-w-[70%]`}>
        <div className={`p-3 rounded-lg bg-blue-600 text-white`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {msg.content}
          </p>
        </div>
        <div className={`text-xs text-muted-foreground mt-1 text-right`}>
          {formatDistanceToNow(msg.createdAt, {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
}

export default ConversationHistoryUserMessage;
