import prisma from "../../prisma-client";
import { Kyc, KycStatus, Prisma } from "@prisma/client";

type DB = Prisma.TransactionClient | typeof prisma;

export const runInTransaction = async <T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> => {
  return prisma.$transaction(async (tx) => callback(tx));
};

export const createKyc = async (
  data: Prisma.KycCreateInput,
  db: DB = prisma,
): Promise<Kyc> => {
  return db.kyc.create({ data });
};

export const getAllKyc = async (): Promise<Kyc[]> => {
  return prisma.kyc.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getAllKycByUserId = async (
  userId: number,
  db: DB = prisma,
): Promise<Kyc[]> => {
  return db.kyc.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getKycById = async (id: number): Promise<Kyc | null> => {
  return prisma.kyc.findUnique({
    where: { id },
  });
};

export const getKycByUserId = async (
  userId: number,
  db: DB = prisma,
): Promise<Kyc | null> => {
  return db.kyc.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getUserKycStatusById = async (
  userId: number,
  db: DB = prisma,
): Promise<KycStatus | null> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { kycStatus: true },
  });

  return user?.kycStatus ?? null;
};

export const updateKyc = async (
  id: number,
  data: Prisma.KycUpdateInput,
  db: DB = prisma,
): Promise<Kyc> => {
  return db.kyc.update({
    where: { id },
    data,
  });
};

export const deleteKyc = async (id: number): Promise<Kyc> => {
  return prisma.kyc.delete({
    where: { id },
  });
};
