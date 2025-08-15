import { z } from "zod";
import { t } from "../lib/trpc";

export const sessionRouter = t.router({
  getSession: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return {
        id: input.id,
      };
    }),
});
