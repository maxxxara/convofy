import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index.router";
import { renderTrpcPanel } from "trpc-ui";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
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

app.listen(port, () => {
  console.log(`✅ API server listening on http://localhost:${port}`);
});
