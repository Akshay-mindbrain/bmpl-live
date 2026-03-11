import prisma from "../../prisma-client";
import { Prisma, RoyalQualifier } from "@prisma/client";

const getClient = (tx?: Prisma.TransactionClient) => tx ?? prisma;

export const createRoyalQualifier = async (
  userId: number,
  childId: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier> => {
  return getClient(tx).royalQualifier.create({
    data: {
      userId,
      childId,
    },
  });
};

export const createRoyalIfNotExists = async (
  userId: number,
  childId: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier | null> => {
  const client = getClient(tx);

  const existing = await client.royalQualifier.findFirst({
    where: {
      userId,
      childId,
    },
  });

  if (existing) return null;

  return client.royalQualifier.create({
    data: {
      userId,
      childId,
    },
  });
};

export const getAllRoyalQualifiers = async (
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier[]> => {
  return getClient(tx).royalQualifier.findMany({
    include: {
      user: true,
      child: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getRoyalByUserId = async (
  userId: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier[]> => {
  return getClient(tx).royalQualifier.findMany({
    where: { userId },
    include: {
      child: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getRoyalByChildId = async (
  childId: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier[]> => {
  return getClient(tx).royalQualifier.findMany({
    where: { childId },
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteRoyalQualifier = async (
  id: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier> => {
  return getClient(tx).royalQualifier.delete({
    where: { id },
  });
};
