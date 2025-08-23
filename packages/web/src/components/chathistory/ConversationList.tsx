import { trpc } from "@/utils/trpc";
import { ScrollArea } from "../ui/scroll-area";
import ConversationListCard from "./ConversationListCard";

function ConversationList({
  selectedSession,
  setSelectedSession,
  currentUserId,
}: {
  selectedSession: any;
  setSelectedSession: any;
  currentUserId: string;
}) {
  const { data: sessions } = trpc.session.getAll.useQuery();
  const trpcUtils = trpc.useUtils();
  return (
    <div className="max-w-80 border-r border-slate-200 flex flex-col flex-1 min-h-0">
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3
            className="font-medium text-slate-800 cursor-pointer"
            onClick={() => {
              trpcUtils.session.getAll.invalidate();
            }}
          >
            Conversations
          </h3>
          <span className="text-muted-foreground text-xs">
            Total: {sessions?.length}
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2 space-y-2">
          {sessions?.map((session) => (
            <ConversationListCard
              key={session.sessions.id}
              session={session}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ConversationList;
