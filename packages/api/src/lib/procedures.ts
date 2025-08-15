import { TRPCError } from "@trpc/server";
import { t } from "./trpc";

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure.use(async ({ ctx, next }) => {
  // Just in case we need to add something to the context
  return next();
});
