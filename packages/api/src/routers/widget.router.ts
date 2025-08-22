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
  Users,
} from "../lib/schema";
import { and, eq } from "drizzle-orm";
import {
  addNewMessage,
  createSession,
  getMessages,
} from "../services/chat.service";
import { checkIfBotExistsAndPublished } from "../services/widget.service";

// Schema for widget initialization
const initWidgetSchema = z.object({
  botId: z.string().min(1, "Bot ID cannot be empty"),
  sessionId: z.string().optional(),
  userId: z.string().optional(),
});

// Schema for sending messages
const sendWidgetMessageSchema = z.object({
  sessionId: z.string().min(1, "Session ID cannot be empty"),
  message: z.string().min(1, "Message cannot be empty"),
});

// Schema for getting bot config
const getBotConfigSchema = z.object({
  botId: z.string().min(1, "Bot ID cannot be empty"),
});

export const widgetRouter = t.router({
  // Get bot configuration for widget initialization
  getBotConfig: publicProcedure
    .input(getBotConfigSchema)
    .query(async ({ input }: { input: z.infer<typeof getBotConfigSchema> }) => {
      try {
        const bot = await checkIfBotExistsAndPublished(input.botId);

        return {
          id: bot.bot_configs?.botId,
          name: bot.bot_configs?.name,
          description: bot.bot_configs?.description,
          avatar: bot.bot_configs?.avatar,
          config: bot.bot_publications?.scriptConfig,
        };
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
          const bot = await checkIfBotExistsAndPublished(input.botId);

          // If sessionId is provided, try to get existing session
          if (input.sessionId) {
            const [existingSession] = await db
              .select()
              .from(Sessions)
              .leftJoin(BotConfigs, eq(Sessions.botId, BotConfigs.botId))
              .leftJoin(Users, eq(Sessions.supportId, Users.id))
              .where(
                and(
                  eq(Sessions.id, input.sessionId),
                  eq(Sessions.botId, input.botId)
                )
              );

            if (existingSession) {
              return existingSession;
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

          const [newSession] = await db
            .select()
            .from(Sessions)
            .leftJoin(BotConfigs, eq(Sessions.botId, BotConfigs.botId))
            .leftJoin(Users, eq(Sessions.supportId, Users.id))
            .where(and(eq(Sessions.id, session.id)));

          return newSession;
        } catch (error) {
          console.log("Init session error: ", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to initialize session",
          });
        }
      }
    ),

  createNewSession: publicProcedure
    .input(initWidgetSchema)
    .mutation(
      async ({ input }: { input: z.infer<typeof initWidgetSchema> }) => {
        try {
          const bot = await checkIfBotExistsAndPublished(input.botId);

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

          const [newSession] = await db
            .select()
            .from(Sessions)
            .leftJoin(BotConfigs, eq(Sessions.botId, BotConfigs.botId))
            .leftJoin(Users, eq(Sessions.supportId, Users.id))
            .where(and(eq(Sessions.id, session.id)));

          return newSession;
        } catch (error) {
          console.log("Create new session error: ", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create new session",
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
          // Additional validation
          if (!input.sessionId || input.sessionId.trim() === "") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Session ID cannot be empty",
            });
          }

          if (!input.message || input.message.trim() === "") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Message cannot be empty",
            });
          }

          // Verify session exists
          const newMessage = await addNewMessage({
            sessionId: input.sessionId,
            message: input.message,
          });

          return {
            message: newMessage,
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
        sessionId: z.string().min(1, "Session ID cannot be empty"),
        botId: z.string().min(1, "Bot ID cannot be empty"),
      })
    )
    .query(
      async ({ input }: { input: { sessionId: string; botId: string } }) => {
        try {
          // Additional validation
          if (!input.sessionId || input.sessionId.trim() === "") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Session ID cannot be empty",
            });
          }

          if (!input.botId || input.botId.trim() === "") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Bot ID cannot be empty",
            });
          }

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
