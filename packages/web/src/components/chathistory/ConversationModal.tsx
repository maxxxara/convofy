import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { MessageSquare, User, Bot, Clock } from "lucide-react";

export function ConversationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Conversation Details
          </DialogTitle>
        </DialogHeader>

        {/* Conversation Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-slate-800">John Doe</h3>
                <Badge variant="outline" className="text-xs">
                  Customer Support Bot
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>10 messages</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  10/10/2025 • 10s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 max-h-[400px]">
          <div className="space-y-4 pr-4">
            {/* User message */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${"bg-slate-100"}`}
                >
                  <User className="w-4 h-4 text-slate-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-slate-800">
                    User
                  </span>
                  <span className="text-xs text-slate-500">
                    10/10/2025 • 10s
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg ${"bg-slate-50 border border-slate-200"}`}
                >
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    Hello, how are you?
                  </p>
                </div>
              </div>
            </div>

            {/* Assistant message */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-blue-100`}
                >
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-slate-800">
                    Assistant
                  </span>
                  <span className="text-xs text-slate-500">
                    10/10/2025 • 10s
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg bg-blue-50 border border-blue-200`}
                >
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    I'm good, thank you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
