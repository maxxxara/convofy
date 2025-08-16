import { and, eq } from "drizzle-orm";
import { db } from "../lib/db";
import { projectProcedure } from "../lib/procedures";
import { UserProjects, Users } from "../lib/schema";
import { t } from "../lib/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const projectUsersRouter = t.router({
  getProjectUsers: projectProcedure.query(async ({ ctx }) => {
    const users = await db
      .select({
        id: Users.id,
        name: Users.name,
        surname: Users.surname,
        email: Users.email,
        role: UserProjects.role,
      })
      .from(UserProjects)
      .leftJoin(Users, eq(UserProjects.userId, Users.id))
      .where(
        and(
          eq(UserProjects.projectId, ctx.user.projectId),
          eq(UserProjects.status, "ACTIVE")
        )
      );
    return users;
  }),

  inviteUser: projectProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [existingUser] = await db
        .select()
        .from(Users)
        .where(and(eq(Users.email, input.email), eq(Users.status, "ACTIVE")));
      if (!existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found in our system",
        });
      }

      const [existingUserProject] = await db
        .select()
        .from(UserProjects)
        .where(
          and(
            eq(UserProjects.userId, existingUser.id),
            eq(UserProjects.projectId, ctx.user.projectId)
          )
        );
      if (existingUserProject) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already in the project",
        });
      }

      await db.insert(UserProjects).values({
        userId: existingUser.id,
        projectId: ctx.user.projectId,
        role: "EDITOR",
      });

      return { message: "User invited successfully" };
    }),

  removeUser: projectProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [userProject] = await db
        .select()
        .from(UserProjects)
        .where(
          and(
            eq(UserProjects.userId, input.userId),
            eq(UserProjects.projectId, ctx.user.projectId)
          )
        );

      if (!userProject) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found in the project",
        });
      }

      if (userProject.role === "OWNER") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot remove owner from the project",
        });
      }

      if (userProject.userId === ctx.user.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot remove yourself from the project",
        });
      }

      await db.delete(UserProjects).where(eq(UserProjects.id, userProject.id));

      return { message: "User removed successfully" };
    }),
});

export default projectUsersRouter;
