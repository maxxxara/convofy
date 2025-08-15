import { initTRPC } from "@trpc/server";
import { TRPCPanelMeta } from "trpc-ui";
import { Context } from "./context";

export const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create();
