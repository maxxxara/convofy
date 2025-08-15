import { t } from "../lib/trpc";
import { sessionRouter } from "./session.router";
import { userRouter } from "./user.router";

export const appRouter = t.router({
  user: userRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
