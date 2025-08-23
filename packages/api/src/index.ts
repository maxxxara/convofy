import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index.router";
import { createContext } from "./lib/context";
import { renderTrpcPanel } from "trpc-ui";
import { activeTelegramBots } from "./services/telegram.service";
import http from "http";
import { createWSServer } from "./wsServer";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: true, // Allow all origins for widget functionality
    credentials: false, // No credentials needed for widget
  })
);
app.use(express.json());

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use("/panel", (_, res) => {
  return res.send(
    renderTrpcPanel(appRouter, {
      url: `http://localhost:${port}/api`,
      meta: {
        title: "My Backend Title",
        description:
          "This is a description of my API, which supports [markdown](https://en.wikipedia.org/wiki/Markdown).",
      },
    })
  );
});

// Create WebSocket server
createWSServer(server);

server.listen(port, async () => {
  await activeTelegramBots();
  console.log(`✅ API server listening on http://localhost:${port}`);
});
