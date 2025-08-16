import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { db } from "../lib/db";
import { Messages, Sessions } from "../lib/schema";

export const createSession = async ({
  botId,
  userId,
}: {
  botId: string;
  userId: string;
}) => {
  const [session] = await db
    .insert(Sessions)
    .values({
      botId,
      userId,
    })
    .returning();
  return session;
};

export const getMessages = async ({
  sessionId,
  getHiddens = false,
}: {
  sessionId: string;
  getHiddens?: boolean;
}) => {
  const messages = await db
    .select(getTableColumns(Messages))
    .from(Messages)
    .where(
      and(
        eq(Messages.sessionId, sessionId),
        eq(Messages.isVisible, !getHiddens)
      )
    )
    .orderBy(asc(Messages.createdAt));
  return messages;
};
export const sendMessage = async ({
  sessionId,
  message,
}: {
  sessionId: string;
  message: string;
}) => {
  await db.insert(Messages).values({
    sessionId,
    role: "USER",
    content: message,
  });
  const messages = await getMessages({ sessionId, getHiddens: true });
  const newMessage = `New message - 394`;
  const [assistantMessage] = await db
    .insert(Messages)
    .values({
      sessionId,
      role: "ASSISTANT",
      content: newMessage,
    })
    .returning();
  return assistantMessage;
};
