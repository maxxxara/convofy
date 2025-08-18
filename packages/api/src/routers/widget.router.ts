import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { t } from "../lib/trpc";
import { publicProcedure } from "../lib/procedures";
import { db } from "../lib/db";
import {
  BotConfigs,
  BotPublications,
  Bots,
  Messages,
  Sessions,
} from "../lib/schema";
import { and, eq } from "drizzle-orm";
import { createSession, getMessages } from "../services/chat.service";
import { sendMessage } from "../services/agent.service";
import { convertMessagesIntoLangchainMessages } from "../lib/helpers";

// Schema for widget initialization
const initWidgetSchema = z.object({
  botId: z.string(),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
});

// Schema for sending messages
const sendWidgetMessageSchema = z.object({
  botId: z.string(),
  sessionId: z.string(),
  message: z.string(),
});

// Schema for getting bot config
const getBotConfigSchema = z.object({
  botId: z.string(),
});

export const widgetRouter = t.router({
  // Get bot configuration for widget initialization
  getBotConfig: publicProcedure
    .input(getBotConfigSchema)
    .query(async ({ input }: { input: z.infer<typeof getBotConfigSchema> }) => {
      try {
        const [bot] = await db
          .select({
            id: BotConfigs.botId,
            name: BotConfigs.name,
            description: BotConfigs.description,
            avatar: BotConfigs.avatar,
            config: BotPublications.scriptConfig,
          })
          .from(BotConfigs)
          .innerJoin(Bots, eq(BotConfigs.botId, Bots.id))
          .innerJoin(BotPublications, eq(Bots.id, BotPublications.botId))
          .where(
            and(
              eq(BotConfigs.botId, input.botId),
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
      } catch (error) {
        console.log("Get bot config error: ", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get bot configuration",
        });
      }
    }),

  // Initialize widget session
  initSession: publicProcedure
    .input(initWidgetSchema)
    .mutation(
      async ({ input }: { input: z.infer<typeof initWidgetSchema> }) => {
        try {
          // Check if bot exists and is published
          const [bot] = await db
            .select()
            .from(BotConfigs)
            .innerJoin(
              BotPublications,
              eq(BotConfigs.botId, BotPublications.botId)
            )
            .where(
              and(
                eq(BotConfigs.botId, input.botId),
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

          // If sessionId is provided, try to get existing session
          if (input.sessionId) {
            const [existingSession] = await db
              .select()
              .from(Sessions)
              .where(
                and(
                  eq(Sessions.id, input.sessionId),
                  eq(Sessions.botId, input.botId)
                )
              );

            if (existingSession) {
              return {
                sessionId: existingSession.id,
                welcomeMessage: bot.bot_configs.welcomeMessage,
              };
            }
          }

          // Create new session
          const session = await createSession({
            botId: input.botId,
            userId: input.userId || `widget-${Date.now()}`,
          });

          // Add welcome message
          await db.insert(Messages).values({
            sessionId: session.id,
            role: "ASSISTANT",
            content: bot.bot_configs.welcomeMessage,
          });

          return {
            sessionId: session.id,
          };
        } catch (error) {
          console.log("Init session error: ", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to initialize session",
          });
        }
      }
    ),

  // Send message to bot
  sendMessage: publicProcedure
    .input(sendWidgetMessageSchema)
    .mutation(
      async ({ input }: { input: z.infer<typeof sendWidgetMessageSchema> }) => {
        try {
          // Verify session exists
          const [session] = await db
            .select()
            .from(Sessions)
            .where(
              and(
                eq(Sessions.id, input.sessionId),
                eq(Sessions.botId, input.botId)
              )
            );

          if (!session) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Session not found",
            });
          }

          // Get bot config
          const [botConfig] = await db
            .select()
            .from(BotConfigs)
            .where(eq(BotConfigs.botId, input.botId));

          if (!botConfig) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Bot configuration not found",
            });
          }

          // Save user message
          await db.insert(Messages).values({
            sessionId: input.sessionId,
            role: "USER",
            content: input.message,
          });

          // Get conversation history
          const messages = convertMessagesIntoLangchainMessages(
            await getMessages({
              sessionId: input.sessionId,
              getHiddens: true,
            })
          );

          // Generate bot response
          const botResponse = await sendMessage({
            messages,
            systemPrompt: botConfig.personalityPrompt || "",
          });

          // Save bot response
          await db.insert(Messages).values({
            sessionId: input.sessionId,
            role: "ASSISTANT",
            content: botResponse,
          });

          return {
            message: botResponse,
          };
        } catch (error) {
          console.log("Send message error: ", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to send message",
          });
        }
      }
    ),

  // Get conversation history
  getMessages: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        botId: z.string(),
      })
    )
    .query(
      async ({ input }: { input: { sessionId: string; botId: string } }) => {
        try {
          // Verify session exists
          const [session] = await db
            .select()
            .from(Sessions)
            .where(
              and(
                eq(Sessions.id, input.sessionId),
                eq(Sessions.botId, input.botId)
              )
            );

          if (!session) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Session not found",
            });
          }

          const messages = await getMessages({
            sessionId: input.sessionId,
            getHiddens: false,
          });

          return messages;
        } catch (error) {
          console.log("Get messages error: ", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get messages",
          });
        }
      }
    ),
});
