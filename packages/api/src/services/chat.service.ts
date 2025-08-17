import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { db } from "../lib/db";
import { Messages, Sessions } from "../lib/schema";

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
