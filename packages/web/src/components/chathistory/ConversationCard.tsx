import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Clock } from "lucide-react";
import { useState } from "react";
import { ConversationModal } from "./ConversationModal";

export function ConversationCard() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ConversationModal open={open} onOpenChange={setOpen} />
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <CardContent className="px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Avatar>
                <AvatarFallback>JF</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">John Doe</h4>
                  <Badge variant="outline" className="text-xs">
                    Customer Support Bot
                  </Badge>
                </div>
                <div className="flex flex-col gap-[6px] text-sm text-muted-foreground">
                  <span>10 messages</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    10/10/2025 • 10s
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => {}}>
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
