import { useState } from "react";
import { Button } from "../components/ui/button";
import { Download, Search } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { StatsCard } from "../components/shared/StatsCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConversationCard } from "@/components/chathistory/ConversationCard";

export function ChatHistory() {
  const stats = [
    { title: "Total Conversations", value: 3 },
    {
      title: "Active Chats",
      value: 3,
    },
    { title: "Avg Satisfaction", value: "4.2/5" },
    {
      title: "Escalated",
      value: 3,
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      <PageHeader
        title="Chat History"
        description="View and analyze all conversations across your chatbots"
        actions={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="mb-6">
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
              <SelectItem value="Event Assistant">Event Assistant</SelectItem>
              <SelectItem value="Sales Inquiry Bot">
                Sales Inquiry Bot
              </SelectItem>
              <SelectItem value="Product FAQ Bot">Product FAQ Bot</SelectItem>
            </SelectContent>
          </Select>
          <Select value={"all"} onValueChange={() => {}}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="unresolved">Unresolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Empty state */}
      {/* <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">No conversations found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div> */}

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ConversationCard key={index} />
        ))}
      </div>
    </div>
  );
}
