import { BotPublications } from "../lib/schema";
import { db } from "../lib/db";
import { BotConfigs } from "../lib/schema";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";

export const checkIfBotExistsAndPublished = async (botId: string) => {
  const [bot] = await db
    .select()
    .from(BotConfigs)
    .innerJoin(BotPublications, eq(BotConfigs.botId, BotPublications.botId))
    .where(
      and(
        eq(BotConfigs.botId, botId),
        eq(BotConfigs.channel, "WEB_WIDGET"),
        eq(BotPublications.status, "PUBLISHED")
      )
    );

  if (!bot) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Bot not found or not published",
    });
  }
  return bot;
};
