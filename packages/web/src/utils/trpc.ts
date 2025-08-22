import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "../../../api/src/routers/index.router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

export type { AppRouter };

export const queryClient = new QueryClient();

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:8080/api",
      transformer: superjson,
      headers: () => {
        const token = localStorage.getItem("token");
        return token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {};
      },
    }),
  ],
});
