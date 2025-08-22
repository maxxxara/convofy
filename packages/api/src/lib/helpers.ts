import { BaseMessage } from "@langchain/core/messages";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { HumanMessage } from "@langchain/core/messages";
import { Messages } from "./schema";

type Message = typeof Messages.$inferSelect;
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const convertMessagesIntoLangchainMessages = (messages: Message[]) => {
  const history = messages
    .map((message) => {
      if (message.role === "USER") {
        return new HumanMessage(message.content);
      } else if (message.role === "ASSISTANT") {
        return new AIMessage(message.content);
      } else if (message.role === "SUPPORT") {
        return new AIMessage(message.content);
      } else {
        console.log("Unknown message role", { role: message.role });
      }
    })
    .filter(
      (message): message is HumanMessage | AIMessage => message !== undefined
    );

  return history;
};

export const conversationToText = (messages: BaseMessage[] | Message[]) => {
  if (messages.length === 0) return "";
  if (!(messages[0] instanceof BaseMessage)) {
    messages = convertMessagesIntoLangchainMessages(messages as Message[]);
  }

  return messages
    .map((message) => {
      if (message instanceof HumanMessage) {
        return `User: ${message.content}`;
      } else if (message instanceof AIMessage) {
        return `Assistant: ${message.content}`;
      }
    })
    .join("\n");
};
