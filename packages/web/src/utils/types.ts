import type { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "./trpc";

export type BotGetAll = Awaited<ReturnType<AppRouter["bot"]["getAll"]>>[number];

export type BotGet = Awaited<ReturnType<AppRouter["bot"]["get"]>>;

export type TrpcClientError = TRPCClientError<AppRouter>;

export type SessionGetAll = Awaited<
  ReturnType<AppRouter["session"]["getAll"]>
>[number];

export type SessionSupportUser = SessionGetAll["users"];

export type SessionMessage = Awaited<
  ReturnType<AppRouter["session"]["getSessionMessages"]>
>[number];
