import { settings } from "./src/lib/settings";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: settings.db_connection_string,
  },
});
