import { MessageSquare } from "lucide-react";

function ConversationHistoryChatEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
        <p className="text-muted-foreground">
          Choose a chat from the left sidebar to view the conversation
        </p>
      </div>
    </div>
  );
}

export default ConversationHistoryChatEmptyState;
