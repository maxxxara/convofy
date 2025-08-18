import { t } from "../lib/trpc";
import { projectProcedure, protectedProcedure } from "../lib/procedures";
import { z } from "zod";
import { db } from "../lib/db";
import { Projects, UserProjects, ProjectLimits } from "../lib/schema";
import { generateToken } from "../lib/jwt";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createProject } from "../services/project.service";

const createOrUpdateProjectSchema = z.object({
  title: z.string().min(1),
});

export const projectRouter = t.router({
  create: protectedProcedure
    .input(createOrUpdateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await createProject({
        title: input.title,
        userId: ctx.user.userId,
      });

      const token = generateToken({
        userId: ctx.user.userId,
        projectId: result.project.id,
      });

      return {
        project: result.project,
        token,
      };
    }),

  getCurrent: projectProcedure.query(async ({ ctx }) => {
    const [project] = await db
      .select(getTableColumns(Projects))
      .from(Projects)
      .where(eq(Projects.id, ctx.user.projectId!));

    if (!project) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get current project",
      });
    }

    return project;
  }),

  updateCurrent: projectProcedure
    .input(createOrUpdateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      if (input.title) {
        const [project] = await db
          .update(Projects)
          .set({ title: input.title })
          .where(eq(Projects.id, ctx.user.projectId!))
          .returning();
        if (!project) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update project title",
          });
        }
        return project;
      }

      return {};
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const projects = await db
        .select(getTableColumns(Projects))
        .from(Projects)
        .innerJoin(UserProjects, eq(Projects.id, UserProjects.projectId))
        .where(eq(UserProjects.userId, ctx.user.userId))
        .orderBy(desc(Projects.createdAt));
      return projects;
    } catch (error) {
      console.log("Get all projects error: ", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get all projects",
      });
    }
  }),

  deleteCurrent: projectProcedure.mutation(async ({ ctx }) => {
    const [project] = await db
      .select()
      .from(Projects)
      .where(eq(Projects.id, ctx.user.projectId!));

    if (!project) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete project",
      });
    }

    await db.delete(Projects).where(eq(Projects.id, ctx.user.projectId!));
    const [remainingProject] = await db
      .select()
      .from(UserProjects)
      .where(eq(UserProjects.userId, ctx.user.userId));
    if (!remainingProject) {
      const token = generateToken({
        userId: ctx.user.userId,
        projectId: null,
      });
      return { message: "Project deleted successfully", token };
    }
    const token = generateToken({
      userId: ctx.user.userId,
      projectId: remainingProject.projectId,
    });
    return { message: "Project deleted successfully", token };
  }),
});
