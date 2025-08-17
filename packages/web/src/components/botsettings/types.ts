export interface BotData {
  name: string;
  description: string;
  avatar: string;
  color: string;
  channel: "website" | "telegram";
  welcomeMessage: string;
  tonePrompt: string;
  fallbackMessage: string;
  status: string;
  isPublished: boolean;
}

export interface TelegramStatus {
  status: "idle" | "testing" | "connected" | "error";
  token: string;
}
