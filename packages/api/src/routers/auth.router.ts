import { publicProcedure } from "../lib/procedures";
import { t } from "../lib/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../lib/jwt";
import { comparePasswords, hashPassword } from "../lib/helpers";
import { db } from "../lib/db";
import { userProjects, users } from "../lib/schema";
import { eq } from "drizzle-orm";
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
      const user = await db
        .insert(users)
        .values({
          name: input.name,
          surname: input.surname,
          email: input.email,
          password: hashedPassword,
        })
        .returning();

      return generateToken({
        userId: user[0].id,
        projectId: null,
      });
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, input.email));
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

    const [project] = await db
      .select()
      .from(userProjects)
      .where(eq(userProjects.userId, user.id));

    return generateToken({
      userId: user.id,
      projectId: project?.projectId || null,
    });
  }),
});
