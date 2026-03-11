import prisma from "../../prisma-client";
import { User, Prisma } from "@prisma/client";

type DB = Prisma.TransactionClient | typeof prisma;

export const runInTransaction = async <T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> => {
  return prisma.$transaction(async (tx) => {
    return callback(tx);
  });
};

export const createUser = async (
  data: Prisma.UserCreateInput,
  db: DB = prisma,
): Promise<User> => {
  return db.user.create({ data });
};

export const getUserById = async (
  id: number,
  db: DB = prisma,
): Promise<User | null> => {
  return db.user.findUnique({ where: { id } });
};

//will get the user details (only for backend usage)
export const getUserByDetails = async (
  id: number,
  db: DB = prisma,
): Promise<User | null> => {
  return db.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (
  email: string,
  db: DB = prisma,
): Promise<User | null> => {
  return db.user.findUnique({ where: { email } });
};

export const getUserByMobile = async (
  mobile: string,
  db: DB = prisma,
): Promise<User | null> => {
  return db.user.findUnique({ where: { mobile } });
};

export const getUsers = async (db: DB = prisma): Promise<User[]> => {
  console.log("api is being hit on repository");
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const updateUser = async (
  id: number,
  data: Prisma.UserUpdateInput,
  db: DB = prisma,
): Promise<User> => {
  return db.user.update({
    where: { id },
    data,
  });
};

export const incrementDirectCount = async (userId: number, db: DB = prisma) => {
  return db.user.update({
    where: { id: userId },
    data: {
      directCount: { increment: 1 },
    },
  });
};

export const deleteUser = async (
  id: number,
  db: DB = prisma,
): Promise<User> => {
  return db.user.delete({ where: { id } });
};

export const countUsers = async (db: DB = prisma): Promise<number> => {
  return db.user.count();
};

export const createRootLineage = async (userId: number, db: DB = prisma) => {
  return db.user.update({
    where: { id: userId },
    data: { lineagePath: `${userId}` },
  });
};

export const createChildLineage = async (
  { userId, parentId }: { userId: number; parentId: number },
  db: DB = prisma,
) => {
  const parent = await db.user.findUnique({
    where: { id: parentId },
    select: { lineagePath: true },
  });

  if (!parent) throw new Error("Parent not found for lineage creation");

  const lineagePath = parent.lineagePath
    ? `${parent.lineagePath},${userId}`
    : `${parentId}.${userId}`;

  return db.user.update({
    where: { id: userId },
    data: { lineagePath },
  });
};

export const findPlacementParent = async (
  sponsorId: number,
  legPosition: "LEFT" | "RIGHT",
  db: DB = prisma,
): Promise<number> => {
  const sponsor = await db.user.findUnique({
    where: { id: sponsorId },
    select: {
      id: true,
      lastLeftId: true,
      lastRightId: true,
    },
  });

  if (!sponsor) throw new Error("Sponsor not found");

  const parentId =
    legPosition === "LEFT" ? sponsor.lastLeftId : sponsor.lastRightId;

  return parentId ?? sponsor.id;
};

export const updateParentChildPointer = async (
  {
    parentId,
    childId,
    legPosition,
  }: {
    parentId: number;
    childId: number;
    legPosition: "LEFT" | "RIGHT";
  },
  db: DB = prisma,
) => {
  return db.user.update({
    where: { id: parentId },
    data:
      legPosition === "LEFT"
        ? { leftChildId: childId, lastLeftId: childId }
        : { rightChildId: childId, lastRightId: childId },
  });
};

/*
export async function updateUpline(
  userId: number,
  lineagePath: string,
  legPosition: "LEFT" | "RIGHT",
  db: DB = prisma,
) {
  const column = legPosition === "LEFT" ? "lastLeftId" : "lastRightId";

  return db.$executeRawUnsafe(
    `
    UPDATE users
    SET ${column} = ?
    WHERE FIND_IN_SET(id, ?)
    AND legPosition = ?
    AND id > (
      SELECT lastOppositeId FROM (
          SELECT id AS lastOppositeId
          FROM users
          WHERE legPosition <> ?
          AND FIND_IN_SET(id, ?)
          ORDER BY id DESC
          LIMIT 1
      ) AS temp
    );
    `,
    userId,
    lineagePath,
    legPosition,
    legPosition,
    lineagePath,
  );
}
*/

export const updateUpline = async (
  {
    userId,
    lineagePath,
    legPosition,
  }: {
    userId: number;
    lineagePath: string;
    legPosition: "LEFT" | "RIGHT";
  },
  db: DB = prisma,
) => {
  const column = legPosition === "LEFT" ? "lastLeftId" : "lastRightId";

  return db.$executeRawUnsafe(
    `
    UPDATE users
    SET ${column} = ?
    WHERE FIND_IN_SET(id, ?)
      AND id <> ?;
    `,
    userId,
    lineagePath,
    userId,
  );
};

export const userIdUpdate = async (
  {
    userId,
  }: {
    userId: number;
  },
  db: DB = prisma,
) => {
  return db.$executeRawUnsafe(
    `
    UPDATE users
    SET uId = id + 1000
    WHERE id = ?
      AND uId IS NULL;
    `,
    userId,
  );
};
