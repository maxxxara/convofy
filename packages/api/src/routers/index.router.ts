import { t } from "../lib/trpc";
import { authRouter } from "./auth.router";
import { botRouter } from "./bot.router";
import { projectRouter } from "./project.router";
import projectUsersRouter from "./projectUsers.router";
import { sessionRouter } from "./session.router";
import { userRouter } from "./user.router";
import { widgetRouter } from "./widget.router";
import { z } from "zod";
// import { realtimeRouter } from "./realtime.router";

export const appRouter = t.router({
  auth: authRouter,
  user: userRouter,
  project: projectRouter,
  projectUsers: projectUsersRouter,
  bot: botRouter,
  widget: widgetRouter,
  session: sessionRouter,
  // realtime: realtimeRouter,
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
