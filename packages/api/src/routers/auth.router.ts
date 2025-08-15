import { publicProcedure } from "../lib/procedures";
import { t } from "../lib/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../lib/jwt";
import { comparePasswords, hashPassword } from "../lib/helpers";
import { EntityStatus, ProjectModel, UserModel } from "../lib/schema";

const registerSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const authRouter = t.router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const hashedPassword = await hashPassword(input.password);
      const user = await UserModel.create({
        name: input.name,
        surname: input.surname,
        email: input.email,
        password: hashedPassword,
      });

      return generateToken({
        userId: user._id.toHexString(),
        projectId: null,
      });
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const user = await UserModel.findOne({
      email: input.email,
      status: EntityStatus.ACTIVE,
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const isPasswordValid = await comparePasswords(
      input.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }

    const project = await ProjectModel.findOne({
      user_projects: {
        $elemMatch: {
          user_id: user._id,
        },
      },
    });

    return generateToken({
      userId: user._id.toHexString(),
      projectId: project?._id.toHexString() || null,
    });
  }),
});
