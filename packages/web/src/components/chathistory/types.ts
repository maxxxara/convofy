export interface Conversation {
  id: number;
  user: string;
  userEmail: string | null;
  bot: string;
  messages: number;
  status: "resolved" | "active" | "escalated" | "unresolved";
  satisfaction: number | null;
  startTime: string;
  duration: string;
  topic: string;
  lastMessage: string;
}
