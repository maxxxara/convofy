import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "../../../api/src/routers/index.router";
import { createWSClient, httpBatchLink, wsLink, splitLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

export type { AppRouter };

const API_URL = "http://localhost:8080/api";
const WS_URL = "ws://localhost:8080/ws";

export const queryClient = new QueryClient();

export const trpc = createTRPCReact<AppRouter>();

const wsClient = createWSClient({
  url: WS_URL,
});

export const trpcClient = trpc.createClient({
  links: [
    splitLink({
      condition(op) {
        // Use WebSocket for subscriptions, HTTP for everything else
        return op.type === "subscription";
      },
      true: wsLink({
        client: wsClient,
        transformer: superjson,
      }),
      false: httpBatchLink({
        url: API_URL,
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
    }),
  ],
});
