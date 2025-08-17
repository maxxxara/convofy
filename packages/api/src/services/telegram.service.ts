import { and, eq, isNotNull } from "drizzle-orm";
import {
  BotConfigs,
  BotPublications,
  Bots,
  Messages,
  Sessions,
} from "../lib/schema";
import { db } from "../lib/db";
import { Bot, Context } from "grammy";
import {
  createSession,
  createTelegramUniqueThreadId,
  getMessages,
  getTelegramSession,
} from "./chat.service";
import { convertMessagesIntoLangchainMessages } from "../lib/helpers";
import { sendMessage } from "./agent.service";

export const answerTelegramMessage = async ({
  botConfig,
  ctx,
}: {
  botConfig: typeof BotConfigs.$inferSelect;
  ctx: Context;
}): Promise<string> => {
  const session = await getTelegramSession({
    botId: botConfig.botId,
    telegramThreadId: createTelegramUniqueThreadId({
      botId: botConfig.botId,
      chatId: ctx.chat?.id.toString() || "",
    }),
  });

  // Save the user's message first
  try {
    await db.insert(Messages).values({
      sessionId: session.id,
      role: "USER",
      content: ctx.message?.text || "",
    });
  } catch (error) {
    console.log("Error saving user message: ", error);
  }

  const messages = convertMessagesIntoLangchainMessages(
    await getMessages({
      sessionId: session.id,
      getHiddens: true,
    })
  );

  const message = await sendMessage({
    messages,
    systemPrompt: botConfig.personalityPrompt || "",
  });

  await db.insert(Messages).values({
    sessionId: session.id,
    role: "ASSISTANT",
    content: message,
  });

  return message;
};

export const activeTelegramBots = async () => {
  const bots = await db
    .select()
    .from(BotPublications)
    .innerJoin(BotConfigs, eq(BotPublications.botId, BotConfigs.botId))
    .where(
      and(
        eq(BotPublications.status, "PUBLISHED"),
        eq(BotConfigs.channel, "TELEGRAM"),
        isNotNull(BotPublications.telegramToken)
      )
    );

  // Start all bots concurrently
  const botPromises = bots.map(async (bot) => {
    try {
      const botInstance = new Bot(bot.bot_publications.telegramToken!);

      // Test the bot token first
      await botInstance.api.getMe();

      // Send welcome message when user starts the bot
      botInstance.command("start", async (ctx) => {
        const session = await createSession({
          botId: bot.bot_configs.botId,
          telegramThreadId: createTelegramUniqueThreadId({
            botId: bot.bot_configs.botId,
            chatId: ctx.chat.id.toString(),
          }),
          userId: `${
            ctx.chat.first_name != "undefined" ? ctx.chat.first_name : ""
          } ${ctx.chat.last_name != "undefined" ? ctx.chat.last_name : ""}`,
        });
        await db.insert(Messages).values({
          sessionId: session.id,
          role: "ASSISTANT",
          content: bot.bot_configs.welcomeMessage,
        });
        ctx.reply(bot.bot_configs.welcomeMessage);
      });

      botInstance.on("message", async (ctx) => {
        if (ctx.message?.text?.startsWith("/start")) return;

        try {
          const message = await answerTelegramMessage({
            botConfig: bot.bot_configs,
            ctx,
          });
          ctx.reply(message);
        } catch (error) {
          console.log("Error answering telegram message: ", error);
          ctx.reply(
            "Sorry, I'm having trouble answering your message. Please try again later."
          );
        }
      });

      // Start the bot (this runs indefinitely)
      await botInstance.start();

      console.log(`Bot ${bot.bot_publications.id} started successfully`);
    } catch (error) {
      console.log(
        `Telegram bot error for bot ${bot.bot_publications.id}:`,
        error
      );
    }
  });

  // Start all bots concurrently
  await Promise.all(botPromises);
};
