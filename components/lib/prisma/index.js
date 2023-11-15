import { PrismaClient } from "@prisma/client";

// Global prisma variable.
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
