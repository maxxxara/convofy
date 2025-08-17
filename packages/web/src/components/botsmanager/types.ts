export interface Bot {
  id: number;
  name: string;
  description: string;
  status: string;
  channel: string;
  channelDisplay: string;
  conversations: number;
  lastActive: string;
  avatar: string;
  color: string;
  knowledgeSources: number;
  isPublished: boolean;
}

export interface CreateBotForm {
  name: string;
  description: string;
  channel: string;
}
