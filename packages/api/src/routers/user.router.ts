import { z } from "zod";
import { t } from "../lib/trpc";
import { protectedProcedure, publicProcedure } from "../lib/procedures";
import { prisma } from "../lib/prisma";
import { TRPCError } from "@trpc/server";

const updateCurrentUserSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
});

export const userRouter = t.router({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    };
  }),

  updateCurrentUser: protectedProcedure
    .input(updateCurrentUserSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { id: ctx.user.userId },
      });

      if (!existingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (existingUser.email !== input.email) {
        const existingUserWithEmail = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (existingUserWithEmail) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already in use",
          });
        }
      }

      const user = await prisma.user.update({
        where: { id: ctx.user.userId },
        data: input,
      });

      return user;
    }),

  deleteCurrentUser: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.userId },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    try {
      await prisma.user.delete({
        where: { id: ctx.user.userId },
      });
    } catch (error) {
      console.log("Delete user error: ", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete user",
      });
    }

    return { success: true };
  }),
});
