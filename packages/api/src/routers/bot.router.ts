import { db } from "../lib/db";
import {
  BotConfigs,
  botPublicationChannelEnum,
  BotPublications,
  botPublicationStatusEnum,
  Bots,
} from "../lib/schema";
import { z } from "zod";
import { t } from "../lib/trpc";
import { projectProcedure } from "../lib/procedures";
import { and, asc, eq, getTableColumns } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const createBotSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
  channel: z.enum(botPublicationChannelEnum.enumValues),
});

const updateBotSchema = z.object({
  botId: z.string(),
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
  welcomeMessage: z.string().optional(),
  personalityPrompt: z.string().optional(),
  channel: z.enum(botPublicationChannelEnum.enumValues),
});

const updateBotPublicationSchema = z.object({
  botPublicationId: z.string(),
  status: z.enum(botPublicationStatusEnum.enumValues),
  scriptConfig: z.record(z.string(), z.any()),
  telegramToken: z.string().optional(),
});

export const botRouter = t.router({
  create: projectProcedure
    .input(createBotSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await db.transaction(async (tx) => {
          const [bot] = await tx
            .insert(Bots)
            .values({
              projectId: ctx.user.projectId,
            })
            .returning();

          const [botConfig, botPublication] = await Promise.all([
            tx
              .insert(BotConfigs)
              .values({
                botId: bot.id,
                name: input.name,
                description: input.description,
                welcomeMessage: "Hello. How can I help you today?",
                channel: input.channel,
              })
              .returning()
              .then((result) => result[0]),
            tx
              .insert(BotPublications)
              .values({
                botId: bot.id,
                status: "DRAFT",
                scriptConfig: {},
              })
              .returning()
              .then((result) => result[0]),
          ]);

          return {
            bot,
            botConfig,
          };
        });

        return result.botConfig;
      } catch (error) {
        console.log("Create bot error: ", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create bot",
        });
      }
    }),

  get: projectProcedure
    .input(z.object({ botId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("Getting bot: ", input.botId);
      const [bot] = await db
        .select({
          ...getTableColumns(BotConfigs),
          status: BotPublications.status,
        })
        .from(BotConfigs)
        .innerJoin(Bots, eq(BotConfigs.botId, Bots.id))
        .innerJoin(BotPublications, eq(Bots.id, BotPublications.botId))
        .where(
          and(eq(Bots.projectId, ctx.user.projectId), eq(Bots.id, input.botId))
        );

      if (!bot) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "You do not have a bot created",
        });
      }

      return bot;
    }),

  getAll: projectProcedure.query(async ({ ctx }) => {
    const bots = await db
      .select({
        ...getTableColumns(BotConfigs),
        status: BotPublications.status,
      })
      .from(BotConfigs)
      .leftJoin(Bots, eq(BotConfigs.botId, Bots.id))
      .leftJoin(BotPublications, eq(Bots.id, BotPublications.botId))
      .where(eq(Bots.projectId, ctx.user.projectId))
      .orderBy(asc(Bots.createdAt));
    return bots;
  }),

  update: projectProcedure
    .input(updateBotSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const [bot] = await db
          .update(BotConfigs)
          .set({
            name: input.name,
            description: input.description,
            avatar: input.avatar,
            welcomeMessage: input.welcomeMessage,
            personalityPrompt: input.personalityPrompt,
            channel: input.channel,
          })
          .where(eq(BotConfigs.botId, input.botId))
          .returning();

        return bot;
      } catch (error) {
        console.log("Update bot error: ", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update bot",
        });
      }
    }),

  getPublication: projectProcedure
    .input(z.object({ botId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [botPublication] = await db
        .select()
        .from(BotPublications)
        .where(eq(BotPublications.botId, input.botId));

      return botPublication;
    }),
  updatePublication: projectProcedure
    .input(updateBotPublicationSchema)
    .mutation(async ({ ctx, input }) => {
      const [botPublication] = await db
        .update(BotPublications)
        .set({
          status: input.status,
          scriptConfig: input.scriptConfig,
          telegramToken: input.telegramToken,
        })
        .where(eq(BotPublications.id, input.botPublicationId))
        .returning();

      return botPublication;
    }),

  delete: projectProcedure
    .input(z.object({ botId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("Deleting bot: ", input.botId);
      await db.delete(Bots).where(eq(Bots.id, input.botId));
      return { message: "Bot deleted successfully" };
    }),
});
