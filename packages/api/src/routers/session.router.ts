import z from "zod";
import { projectProcedure, publicProcedure } from "../lib/procedures";
import { t } from "../lib/trpc";
import { db } from "../lib/db";
import { BotConfigs, Bots, Messages, Sessions, Users } from "../lib/schema";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { addNewMessage } from "../services/chat.service";
import {
  emitNewMessage,
  emitSupportAssigned,
  emitTyping,
  createEventSubscription,
} from "../services/realtime.service";

const updateSessionSchema = z.object({
  sessionId: z.string(),
  supportId: z.string(),
});

export const sessionRouter = t.router({
  getAll: projectProcedure.query(async ({ ctx }) => {
    const botsFromProject = await db
      .select({
        id: Bots.id,
      })
      .from(Bots)
      .where(eq(Bots.projectId, ctx.user.projectId));
    const sessions = await db
      .select()
      .from(Sessions)
      .leftJoin(BotConfigs, eq(Sessions.botId, BotConfigs.botId))
      .leftJoin(Users, eq(Sessions.supportId, Users.id))
      .where(
        inArray(
          Sessions.botId,
          botsFromProject.map((bot) => bot.id)
        )
      )
      .orderBy(desc(Sessions.updatedAt));
    return sessions;
  }),

  getSessionMessages: projectProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;
      const messages = await db
        .select()
        .from(Messages)
        .where(eq(Messages.sessionId, sessionId))
        .orderBy(asc(Messages.createdAt));

      return messages;
    }),

  update: projectProcedure
    .input(updateSessionSchema)
    .mutation(async ({ ctx, input }) => {
      const { sessionId, supportId } = input;
      const [session] = await db
        .update(Sessions)
        .set({ supportId, updatedAt: new Date() })
        .where(eq(Sessions.id, sessionId))
        .returning();
      if (session.supportId) {
        emitSupportAssigned(sessionId);
      }
      return session;
    }),

  sendMessage: projectProcedure
    .input(
      z.object({
        sessionId: z.string(),
        message: z.string(),
        fromSupport: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newMessage = await addNewMessage({
        sessionId: input.sessionId,
        message: input.message,
        fromSupport: input.fromSupport,
      });
      emitNewMessage(input.sessionId);
      return newMessage;
    }),

  emitTyping: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        who: z.enum(["user", "support"]),
        isTyping: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      emitTyping(input.sessionId, input.who, input.isTyping);
    }),

  onTyping: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .subscription(async function* (opts) {
      yield* createEventSubscription(`session:${opts.input.sessionId}:typing`)(
        opts
      );
    }),
});
