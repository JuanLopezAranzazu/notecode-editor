import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app (and across
// hot-reloads in dev) to avoid exhausting the database connection pool.
declare global {
  // eslint-disable-next-line no-var
  var __notecodePrisma: PrismaClient | undefined;
}

export const prisma = global.__notecodePrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__notecodePrisma = prisma;
}
