import { useState } from "react";
import { Button } from "../components/ui/button";
import { Filter, Search } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConversationHistoryChat from "@/components/chathistory/ConversationHistoryChat";
import ConversationList from "@/components/chathistory/ConversationList";
import ConversationHistoryChatEmptyState from "@/components/chathistory/ConversationHistoryChatEmptyState";
import type { SessionGetAll } from "@/utils/types";

export function ChatHistory() {
  const [selectedSession, setSelectedSession] = useState<SessionGetAll | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="p-6 pb-0 flex-shrink-0">
        <PageHeader
          title="Chat History"
          description="View and analyze all conversations across your chatbots"
          actions={
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <Filter className="w-4 h-4 ml-2" />
            </Button>
          }
        />

        {/* Filters */}
        {showFilters && (
          <div className="mb-4">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 mt-0"
                />
              </div>
              <Select value={"all"} onValueChange={() => {}}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by bot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bots</SelectItem>
                  <SelectItem value="Customer Support Bot">
                    Customer Support Bot
                  </SelectItem>
                  <SelectItem value="Event Assistant">
                    Event Assistant
                  </SelectItem>
                  <SelectItem value="Sales Inquiry Bot">
                    Sales Inquiry Bot
                  </SelectItem>
                  <SelectItem value="Product FAQ Bot">
                    Product FAQ Bot
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={"all"} onValueChange={() => {}}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chats</SelectItem>
                  <SelectItem value="unassigned">Unassigned Only</SelectItem>
                  <SelectItem value="assigned">Assigned Only</SelectItem>
                  <SelectItem value="my-chats">My Chats Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Chat Layout */}
      <div className="flex flex-1 border-t border-slate-200 min-h-0">
        {/* Left Sidebar - Chat List */}
        <ConversationList
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          currentUserId="support123"
        />
        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col min-h-0 w-full">
          {selectedSession ? (
            <ConversationHistoryChat
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
            />
          ) : (
            <ConversationHistoryChatEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
