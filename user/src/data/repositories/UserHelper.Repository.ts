import { PrismaClient, Prisma, User } from "@prisma/client";
const prisma = new PrismaClient();

type DB = Prisma.TransactionClient | typeof prisma;

export const getImmediateChild = async (
  userId: number,
  legPosition: "LEFT" | "RIGHT",
) => {
  return prisma.user.findFirst({
    where: {
      parentId: userId,
      legPosition: legPosition,
    },
    select: {
      id: true,
      lineagePath: true,
    },
  });
};

export const getLastNode = async (lineagePath: string) => {
  return prisma.$queryRaw<User[]>`
    SELECT *
    FROM users
    WHERE lineagePath LIKE ${`${lineagePath}%`}
  `;
};

export const getAllDownline = async (lineagePath: string) => {
  return prisma.$queryRaw<User[]>`
    SELECT *
    FROM users
    WHERE lineagePath LIKE CONCAT(${lineagePath}, ',%');
  `;
};

export const getAllUpLine = async (lineagePath: string) => {
  const ids = lineagePath.split(",").map(Number).filter(Number.isFinite);
  return prisma.$queryRaw<User[]>`
    select * from users where id in (${Prisma.join(ids)});
    `;
};

export async function findPlacementParentUsingLastLeg(
  sponsorId: number,
  legPosition: "LEFT" | "RIGHT",
  db: DB = prisma,
): Promise<number> {
  const sponsor = await db.user.findUnique({
    where: { id: sponsorId },
    select: { id: true, lastLeftId: true, lastRightId: true },
  });

  if (!sponsor) throw new Error("Sponsor not found");

  // pick correct pointer
  const lastLegId =
    legPosition === "LEFT" ? sponsor.lastLeftId : sponsor.lastRightId;

  // CASE 1 → no one in that leg yet → parent = sponsor
  if (!lastLegId) return sponsor.id;

  // CASE 2 → place under last node of that leg
  return lastLegId;
}

// export const updateAncestorLastNodes = async (
//   placementParentId: number,
//   legPosition: "LEFT" | "RIGHT",
// ) => {
//   // get lineagePath of placement parent
//   const parent = await prisma.user.findUnique({
//     where: { id: placementParentId },
//     select: { lineagePath: true },
//   });

//   if (!parent) return;

//   // ancestors including parent
//   const ancestorIds = parent.lineagePath
//     .split(",")
//     .map(Number)
//     .filter(Number.isFinite);

//   // update bottom → top
//   for (const ancestorId of ancestorIds.reverse()) {
//     const lastNodeId = await getLastNode(ancestorId, legPosition);

//     await prisma.user.update({
//       where: { id: ancestorId },
//       data: {
//         lastLeftId:
//  legPosition === "LEFT" ? lastNodeId : undefined,
//         lastRightId:
//  legPosition === "RIGHT" ? lastNodeId : undefined,
//       },
//     });
//   }
// };
