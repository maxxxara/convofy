// import { t } from "../lib/trpc";
// import { protectedProcedure } from "../lib/procedures";
// import { z } from "zod";
// import {
//   ProjectModel,
//   UserProjectModel,
//   ProjectLimitModel,
//   UserProjectRole,
//   EntityStatus,
// } from "../lib/schema";

// const createProjectSchema = z.object({
//   title: z.string().min(1),
//   logo: z.string().optional(),
// });

// // Type for projected project fields
// type ProjectSummary = {
//   _id: string;
//   title: string;
//   logo?: string;
// };

// export const projectRouter = t.router({
//   create: protectedProcedure
//     .input(createProjectSchema)
//     .mutation(async ({ input, ctx }) => {
//       // Create project first
//       const project = await ProjectModel.create({
//         title: input.title,
//         logo: input.logo,
//       });

//       // Create user-project relationship
//       await UserProjectModel.create({
//         user_id: ctx.user.userId,
//         project_id: project._id,
//         role: UserProjectRole.OWNER,
//       });

//       // Create project limits
//       await ProjectLimitModel.create({
//         project_id: project._id,
//         remaining_documents: 100,
//         remaining_faq_questions: 100,
//         remaining_live_interactions: 100,
//         remaining_users_count: 100,
//       });

//       return {
//         success: true,
//         project: project,
//       };
//     }),

//   getAll: protectedProcedure.query(async ({ ctx }) => {
//     const projects = await ProjectModel.find(
//       {
//         user_projects: {
//           $elemMatch: { user_id: ctx.user.userId },
//           status: EntityStatus.ACTIVE,
//         },
//       },
//       { _id: 1, title: 1, logo: 1 }
//     ).lean();
//     return projects;
//   }),
// });
