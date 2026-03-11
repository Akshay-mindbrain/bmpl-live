import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Use Prisma.QueryEvent for type safety
// prisma.$on("query", (e: Prisma.QueryEvent) => {
//   console.log("Query:", e.query);
//   console.log("Params:", e.params);
//   console.log("Duration:", e.duration, "ms");
// });

export default prisma;
