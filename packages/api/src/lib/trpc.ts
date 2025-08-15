import { initTRPC } from "@trpc/server";
import { TRPCPanelMeta } from "trpc-ui";

export const t = initTRPC.meta<TRPCPanelMeta>().create();
