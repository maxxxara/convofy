import { z } from "zod";
import { t } from "../lib/trpc";
import { PrismaClient } from "../lib/prisma";

export const userRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return {
        id: input.id,
        name: "John Doe",
        email: "john.doe@example.com",
      };
    }),
});
