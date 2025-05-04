import { PrismaClient } from "@prisma/client";

// Extend the global namespace to include our cached Prisma instance
declare global {
    // Using no-var here because it's required for global declarations
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient;
}

// Declare prisma variable to hold our database connection
let prisma: PrismaClient;

// In production, create a new Prisma instance for each server instance
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // In development, reuse the same Prisma instance across hot reloads
    // This prevents creating multiple database connections during development
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

// Export the Prisma instance for use in other files
export const db = prisma;
