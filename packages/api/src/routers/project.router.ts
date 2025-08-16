import { t } from "../lib/trpc";
import { projectProcedure, protectedProcedure } from "../lib/procedures";
import { z } from "zod";
import { db } from "../lib/db";
import { Projects, UserProjects, ProjectLimits } from "../lib/schema";
import { generateToken } from "../lib/jwt";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const createProjectSchema = z.object({
  title: z.string().min(1),
  logo: z.string().optional(),
});

const updateCurrentProjectSchema = z.object({
  title: z.string().min(1).optional(),
  logo: z.string().optional(),
});

// Type for projected project fields
type ProjectSummary = {
  _id: string;
  title: string;
  logo?: string;
};

export const projectRouter = t.router({
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await db.transaction(async (tx) => {
        const [project] = await tx
          .insert(Projects)
          .values({
            title: input.title,
            logo: input.logo,
          })
          .returning();

        const [[userProject], [projectLimit]] = await Promise.all([
          tx
            .insert(UserProjects)
            .values({
              userId: ctx.user.userId,
              projectId: project.id,
              role: "OWNER",
            })
            .returning(),
          tx
            .insert(ProjectLimits)
            .values({
              projectId: project.id,
              remainingFaqQuestions: 100,
              remainingDocuments: 50,
              remainingLiveInteractions: 1000,
              remainingUsersCount: 10,
            })
            .returning(),
        ]);

        return {
          project,
          userProject,
          projectLimit,
        };
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
    .input(updateCurrentProjectSchema)
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
