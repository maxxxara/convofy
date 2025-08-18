import { db } from "../lib/db";
import { Projects, UserProjects, ProjectLimits } from "../lib/schema";

export const createProject = async ({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) => {
  const result = await db.transaction(async (tx) => {
    const [project] = await tx
      .insert(Projects)
      .values({
        title,
      })
      .returning();

    const [[userProject], [projectLimit]] = await Promise.all([
      tx
        .insert(UserProjects)
        .values({
          userId: userId,
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

  return result;
};
