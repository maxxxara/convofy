import { TRPCError } from "@trpc/server";
import { t } from "./trpc";

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user?.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }
  return next({
    ctx: {
      user: ctx.user as typeof ctx.user & { userId: string },
    },
  });
});

export const projectProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    if (!ctx.user.projectId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No active project found",
      });
    }
    return next({
      ctx: {
        user: ctx.user as typeof ctx.user & {
          userId: string;
          projectId: string;
        },
      },
    });
  }
);

export const publicProcedure = t.procedure.use(async ({ ctx, next }) => {
  // Just in case we need to add something to the context
  return next();
});
