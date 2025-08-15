import { publicProcedure } from "../lib/procedures";
import { t } from "../lib/trpc";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../lib/jwt";
import { comparePasswords, hashPassword } from "../lib/helpers";

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
      const user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          surname: input.surname,
          password: hashedPassword,
        },
      });

      return generateToken({
        userId: user.id,
        projectId: null,
      });
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
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

    const project = await prisma.project.findFirst({
      where: {
        user_projects: {
          some: {
            user_id: user.id,
          },
        },
      },
    });

    return generateToken({
      userId: user.id,
      projectId: project?.id || null,
    });
  }),
});
