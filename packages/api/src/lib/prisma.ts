import { PrismaClient } from "../../prisma-generated/client";
import { settings } from "./settings";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: settings.db_connection_string,
      },
    },
  });

export { PrismaClient } from "../../prisma-generated/client";
