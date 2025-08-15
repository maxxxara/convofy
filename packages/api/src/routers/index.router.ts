import { t } from "../lib/trpc";
import { sessionRouter } from "./session.router";
import { userRouter } from "./user.router";
import { z } from "zod";

export const appRouter = t.router({
  user: userRouter,
  session: sessionRouter,
  // TODO: REMOVE. JUST FOR TESTING
  health: t.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }) => {
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        value: input.name,
      };
    }),
  healthPost: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return { status: "ok", value: input.name };
    }),
});

export type AppRouter = typeof appRouter;
