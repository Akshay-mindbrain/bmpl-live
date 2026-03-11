import prisma from "../../prisma-client";
import { Prisma, UserTreeClosure } from "@prisma/client";

type DB = Prisma.TransactionClient | typeof prisma;

export const createClosure = async (
  data: Prisma.UserTreeClosureCreateInput,
  db: DB = prisma,
): Promise<UserTreeClosure> => {
  return db.userTreeClosure.create({ data });
};

export const getClosureById = async (
  id: number,
  db: DB = prisma,
): Promise<UserTreeClosure | null> => {
  return db.userTreeClosure.findUnique({
    where: { id },
  });
};

export const getClosuresBySponsor = async (
  sponsorId: number,
  db: DB = prisma,
): Promise<UserTreeClosure[]> => {
  return db.userTreeClosure.findMany({
    where: { sponsorId },
  });
};

export const deleteClosure = async (
  id: number,
  db: DB = prisma,
): Promise<UserTreeClosure> => {
  return db.userTreeClosure.delete({
    where: { id },
  });
};
