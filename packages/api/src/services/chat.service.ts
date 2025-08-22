import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { db } from "../lib/db";
import { BotConfigs, Messages, Sessions } from "../lib/schema";
import { convertMessagesIntoLangchainMessages } from "../lib/helpers";
import { TRPCError } from "@trpc/server";
import { generateAnswer } from "./agent.service";

export const createTelegramUniqueThreadId = ({
  botId,
  chatId,
}: {
  botId: string;
  chatId: string;
}) => {
  return `${botId}-${chatId}`;
};

export const createSession = async ({
  botId,
  userId,
  telegramThreadId,
}: {
  botId: string;
  userId?: string;
  telegramThreadId?: string;
}) => {
  const [session] = await db
    .insert(Sessions)
    .values({
      botId,
      telegramThreadId,
      userId,
    })
    .returning();
  return session;
};

export const getTelegramSession = async ({
  botId,
  telegramThreadId,
}: {
  botId: string;
  telegramThreadId?: string;
}) => {
  const whereConditions = [eq(Sessions.botId, botId)];
  if (telegramThreadId) {
    whereConditions.push(eq(Sessions.telegramThreadId, telegramThreadId));
  }

  const [session] = await db
    .select()
    .from(Sessions)
    .where(and(...whereConditions));
  return session;
};

export const getMessages = async ({
  sessionId,
  getHiddens = false,
}: {
  sessionId: string;
  getHiddens?: boolean;
}) => {
  const whereConditions = [eq(Messages.sessionId, sessionId)];
  if (!getHiddens) {
    whereConditions.push(eq(Messages.isVisible, true));
  }

  const messages = await db
    .select(getTableColumns(Messages))
    .from(Messages)
    .where(and(...whereConditions))
    .orderBy(asc(Messages.createdAt));
  return messages;
};

// If message is from support, just add it into database and return. If message is from user, generate answer and return.
export const addNewMessage = async ({
  sessionId,
  message,
  fromSupport = false,
}: {
  sessionId: string;
  message: string;
  fromSupport?: boolean;
}) => {
  const [session] = await db
    .select()
    .from(Sessions)
    .leftJoin(BotConfigs, eq(Sessions.botId, BotConfigs.botId))
    .where(eq(Sessions.id, sessionId));

  if (!session) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Session not found",
    });
  }
  if (!session.bot_configs) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Bot config not found",
    });
  }

  const [insertedMessage] = await db
    .insert(Messages)
    .values({
      sessionId: sessionId,
      role: fromSupport ? "SUPPORT" : "USER",
      content: message,
    })
    .returning();

  if (session.sessions.supportId) {
    return insertedMessage;
  }
  const messages = convertMessagesIntoLangchainMessages(
    await getMessages({
      sessionId: sessionId,
      getHiddens: true,
    })
  );
  const botResponse = await generateAnswer({
    messages,
    systemPrompt: session.bot_configs?.personalityPrompt || "",
  });
  const [insertedBotResponse] = await db
    .insert(Messages)
    .values({
      sessionId: sessionId,
      role: "ASSISTANT",
      content: botResponse,
    })
    .returning();

  await db
    .update(Sessions)
    .set({
      updatedAt: new Date(),
    })
    .where(eq(Sessions.id, sessionId));

  return insertedBotResponse;
};
