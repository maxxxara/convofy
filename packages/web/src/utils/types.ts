import type { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "./trpc";

export type BotGetAll = Awaited<ReturnType<AppRouter["bot"]["getAll"]>>[number];

export type BotGet = Awaited<ReturnType<AppRouter["bot"]["get"]>>;

export type TrpcClientError = TRPCClientError<AppRouter>;
