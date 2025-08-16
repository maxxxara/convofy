import { db } from "../lib/db";
import { BotConfigs, Bots } from "../lib/schema";
import { z } from "zod";
import { t } from "../lib/trpc";
import { projectProcedure } from "../lib/procedures";
import { eq, getTableColumns } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const createBotSchema = z.object({
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
});

const updateBotSchema = z.object({
  botId: z.string(),
  name: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
  welcomeMessage: z.string().optional(),
  personalityPrompt: z.string().optional(),
});

export const botRouter = t.router({
  create: projectProcedure
    .input(createBotSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await db.transaction(async (tx) => {
        const [bot] = await tx
          .insert(Bots)
          .values({
            projectId: ctx.user.projectId,
          })
          .returning();

        const [botConfig] = await tx
          .insert(BotConfigs)
          .values({
            botId: bot.id,
            name: input.name,
            description: input.description,
            welcomeMessage: "Hello. How can I help you today?",
          })
          .returning();

        return {
          bot,
          botConfig,
        };
      });

      return result.botConfig;
    }),

  get: projectProcedure.query(async ({ ctx }) => {
    const [bot] = await db
      .select(getTableColumns(BotConfigs))
      .from(BotConfigs)
      .innerJoin(Bots, eq(BotConfigs.botId, Bots.id))
      .where(eq(Bots.projectId, ctx.user.projectId));

    if (!bot) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "You do not have a bot created",
      });
    }

    return bot;
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
});
