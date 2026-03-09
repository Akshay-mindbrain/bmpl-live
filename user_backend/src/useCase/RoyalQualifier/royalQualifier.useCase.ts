import prisma from "../../prisma-client";
import { Prisma, RoyalQualifier } from "@prisma/client";
import * as royalRepo from "../../data/repositories/RoyalQualifier.Repository";

export const createRoyalQualifierService = async (
  userId: number,
  childId: number,
  tx?: Prisma.TransactionClient,
): Promise<RoyalQualifier> => {
  const client = tx ?? prisma;

  if (!userId || !childId) {
    throw new Error("userId and childId are required");
  }

  if (userId === childId) {
    throw new Error("User cannot qualify themselves");
  }

  const [user, child] = await Promise.all([
    client.user.findUnique({ where: { id: userId } }),
    client.user.findUnique({ where: { id: childId } }),
  ]);

  if (!user) throw new Error("Parent user not found");
  if (!child) throw new Error("Child user not found");

  return royalRepo.createRoyalQualifier(userId, childId, client);
};
