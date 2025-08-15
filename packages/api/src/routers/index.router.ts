import { t } from "../lib/trpc";
import { authRouter } from "./auth.router";
import { projectRouter } from "./project.router";
import { userRouter } from "./user.router";
import { z } from "zod";

export const appRouter = t.router({
  user: userRouter,
  // project: projectRouter,
  auth: authRouter,
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
