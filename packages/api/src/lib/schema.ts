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
  primaryKey,
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
export const botPublicationStatusEnum = pgEnum("BotPublicationStatus", [
  "DRAFT",
  "PUBLISHED",
]);
export const botPublicationChannelEnum = pgEnum("BotPublicationChannel", [
  "TELEGRAM",
  "WEB_WIDGET",
]);
export const entityStatusEnum = pgEnum("EntityStatus", ["ACTIVE", "DISABLED"]);

// Tables
export const Users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  surname: varchar("surname").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const UserProjects = pgTable(
  "user_projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    projectId: uuid("project_id")
      .notNull()
      .references(() => Projects.id, { onDelete: "cascade" }),
    role: userProjectRoleEnum("role").notNull(),
    status: entityStatusEnum("status").default("ACTIVE").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.projectId)]
);

export const ProjectLimits = pgTable("project_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .unique()
    .references(() => Projects.id, { onDelete: "cascade" }),
  remainingFaqQuestions: integer("remaining_faq_questions").notNull(),
  remainingDocuments: integer("remaining_documents").notNull(),
  remainingLiveInteractions: integer("remaining_live_interactions").notNull(),
  remainingUsersCount: integer("remaining_users_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Bots = pgTable("bots", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => Projects.id, { onDelete: "cascade" }),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const BotConfigs = pgTable("bot_configs", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .unique()
    .references(() => Bots.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: varchar("description").notNull(),
  welcomeMessage: varchar("welcome_message").notNull(),
  personalityPrompt: varchar("personality_prompt"),
  avatar: varchar("avatar"),
  channel: botPublicationChannelEnum("channel").notNull(),
});

export const BotPublications = pgTable("bot_publications", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .unique()
    .references(() => Bots.id, { onDelete: "cascade" }),
  status: botPublicationStatusEnum("status").default("DRAFT").notNull(),
  telegramToken: varchar("telegram_token"),
  scriptConfig: json("script_config"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const Tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: varchar("identifier").notNull(),
  botId: uuid("bot_id").references(() => Bots.id, { onDelete: "cascade" }),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => Sessions.id, { onDelete: "cascade" }),
  data: json("data"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id"),
  botId: uuid("bot_id")
    .notNull()
    .references(() => Bots.id, { onDelete: "cascade" }),
  telegramThreadId: varchar("telegram_thread_id"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => Sessions.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  content: varchar("content").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const FaqQuestions = pgTable("faq_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => Bots.id, { onDelete: "cascade" }),
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

export const Documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => Bots.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  fileUrl: varchar("file_url").notNull(),
  embeddingStatus: processingStatusEnum("embedding_status")
    .default("IN_PROGRESS")
    .notNull(),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const DocumentChunks = pgTable("document_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentId: uuid("document_id")
    .notNull()
    .references(() => Documents.id, { onDelete: "cascade" }),
  chunkIndex: integer("chunk_index").notNull(),
  chunkText: varchar("chunk_text").notNull(),
  embedding: varchar("embedding"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const LiveInteractions = pgTable("live_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  botId: uuid("bot_id")
    .notNull()
    .references(() => Bots.id, { onDelete: "cascade" }),
  interaction: json("interaction"),
  results: json("results"),
  status: entityStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
