import React from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import type { SessionMessage } from "@/utils/types";

interface MessageBubbleProps {
  message: SessionMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "USER";

  return isUser ? (
    <UserMessage message={message} />
  ) : (
    <BotMessage message={message} />
  );
};

export default MessageBubble;
