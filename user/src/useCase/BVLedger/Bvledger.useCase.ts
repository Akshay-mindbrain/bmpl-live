import prisma from "@/prisma-client";
import { Prisma, PurchaseType, BVLedger } from "@prisma/client";

export const createBVLedgerForLineage = async (
  userId: number,
  data: Prisma.BVLedgerCreateManyInput,
  lineagePath: string,
): Promise<BVLedger[]> => {
  if (data.purchase_type === PurchaseType.SHARE_PURCHASE) {
    return [];
  }

  // 1️⃣ Fetch uplines (exclude self)
  const filteredUsers = await prisma.$queryRaw<{ id: number }[]>`
    SELECT id
    FROM users
    WHERE FIND_IN_SET(id, ${lineagePath})
      AND id <> ${userId}
  `;

  if (!filteredUsers.length) return [];

  const userIds = filteredUsers.map((u) => u.id);

  // 2️⃣ Insert
  await prisma.bVLedger.createMany({
    data: userIds.map((uplineId) => ({
      purchase_id: data.purchase_id,
      buyer_id: data.buyer_id,
      user_id: uplineId,
      bv: data.bv,
      purchase_type: data.purchase_type,
      buyer_leg: data.buyer_leg ?? null,
      is_income_generated: data.is_income_generated ?? "NO",
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    })),
    skipDuplicates: true,
  });

  // 3️⃣ Fetch and return inserted rows
  const createdLedgers = await prisma.bVLedger.findMany({
    where: {
      purchase_id: data.purchase_id,
      buyer_id: data.buyer_id,
      user_id: { in: userIds },
    },
  });

  return createdLedgers;
};
