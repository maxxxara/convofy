import { drizzle } from "drizzle-orm/node-postgres";
import { settings } from "./settings";
import { users } from "./schema";

export const db = drizzle(settings.db_connection_string);
