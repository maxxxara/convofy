import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";
import { appRouter } from "./routers/index.router";
import { createContext } from "./lib/context";
import { JwtPayload, verifyToken } from "./lib/jwt";

const createWSContext = async (opts: any) => {
  const token = opts.info.headers?.authorization?.split(" ")[1];
  let user: JwtPayload | null = null;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      user = decoded;
    }
  }

  return { user };
};

// Export the WebSocket handler to be used in your main server
export const createWSServer = (server: any) => {
  const wss = new ws.Server({
    server, // Attach to existing HTTP server
    path: "/ws", // WebSocket endpoint at /ws
  });

  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: createWSContext,
    keepAlive: {
      enabled: true,
      pingMs: 30000,
      pongWaitMs: 5000,
    },
  });

  wss.on("connection", (ws) => {
    console.log(`➕➕ WebSocket Connection (${wss.clients.size})`);
    ws.once("close", () => {
      console.log(`➖➖ WebSocket Disconnection (${wss.clients.size})`);
    });
  });

  console.log("✅ WebSocket Server attached to HTTP server at /ws");
  return { wss, handler };
};
