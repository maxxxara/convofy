import { z } from "zod";
import { t } from "../lib/trpc";
import { protectedProcedure, publicProcedure } from "../lib/procedures";
import { TRPCError } from "@trpc/server";
import { UserModel } from "../lib/schema";

const updateCurrentUserSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
});

export const userRouter = t.router({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await UserModel.findById(ctx.user.userId);

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
      const existingUser = await UserModel.findById(ctx.user.userId);
      if (!existingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (existingUser.email !== input.email) {
        const existingUserWithEmail = await UserModel.findOne({
          email: input.email,
        });

        if (existingUserWithEmail) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already in use",
          });
        }
      }

      const user = await UserModel.findByIdAndUpdate(ctx.user.userId, {
        name: input.name,
        surname: input.surname,
        email: input.email,
      });

      return user;
    }),

  deleteCurrentUser: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await UserModel.findById(ctx.user.userId);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    try {
      await UserModel.findByIdAndDelete(ctx.user.userId);
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
