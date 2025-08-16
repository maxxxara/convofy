import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  json,
  unique,
} from "drizzle-orm/pg-core";

// Enums
export const userProjectRoleEnum = pgEnum("UserProjectRole", [
  "OWNER",
  "EDITOR",
]);
export const messageRoleEnum = pgEnum("MessageRole", ["USER", "ASSISTANT"]);
export const processingStatusEnum = pgEnum("ProcessingStatus", [
  "IN_PROGRESS",
  "READY",
]);
export const entityStatusEnum = pgEnum("EntityStatus", ["ACTIVE", "DISABLED"]);

// Tables
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  surname: varchar("surname").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  logo: varchar("logo"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userProjects = pgTable(
  "user_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    role: userProjectRoleEnum("role").notNull(),
    status: entityStatusEnum("status").default("ACTIVE").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserProject: unique().on(table.userId, table.projectId),
  })
);

export const projectLimits = pgTable("project_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .unique()
    .references(() => projects.id, { onDelete: "cascade" }),
  remainingFaqQuestions: integer("remaining_faq_questions").notNull(),
  remainingDocuments: integer("remaining_documents").notNull(),
  remainingLiveInteractions: integer("remaining_live_interactions").notNull(),
  remainingUsersCount: integer("remaining_users_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bots = pgTable("bots", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .unique()
    .references(() => projects.id, { onDelete: "cascade" }),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const botConfigs = pgTable("bot_configs", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .unique()
    .references(() => bots.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  welcomeMessage: varchar("welcome_message").notNull(),
  personalityPrompt: varchar("personality_prompt"),
  avatar: varchar("avatar"),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  content: varchar("content").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const faqQuestions = pgTable("faq_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  question: varchar("question").notNull(),
  answer: varchar("answer").notNull(),
  embeddingStatus: processingStatusEnum("embedding_status")
    .default("IN_PROGRESS")
    .notNull(),
  embedding: varchar("embedding"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  fileUrl: varchar("file_url").notNull(),
  embeddingStatus: processingStatusEnum("embedding_status")
    .default("IN_PROGRESS")
    .notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const documentChunks = pgTable("document_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentId: uuid("document_id")
    .notNull()
    .references(() => documents.id, { onDelete: "cascade" }),
  chunkIndex: integer("chunk_index").notNull(),
  chunkText: varchar("chunk_text").notNull(),
  embedding: varchar("embedding"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const liveInteractions = pgTable("live_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => bots.id, { onDelete: "cascade" }),
  interaction: json("interaction"),
  results: json("results"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
