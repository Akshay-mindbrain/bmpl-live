import prisma from "../../prisma-client";
import { Prisma, PurchaseType, BVLedger } from "@prisma/client";

type BVLedgerRawInput = Pick<
  Prisma.BVLedgerUncheckedCreateInput,
  "purchase_id" | "buyer_id" | "bv" | "purchase_type" | "is_income_generated"
>;
export const createBVLedgerForLineage = async (
  userId: number,
  data: Prisma.BVLedgerCreateManyInput,
  lineagePath: string,
): Promise<BVLedger[]> => {
  if (data.purchase_type === PurchaseType.SHARE_PURCHASE) {
    return [];
  }

  const filteredUsers = await prisma.$queryRaw<{ id: number }[]>`
    SELECT id
    FROM users
    WHERE FIND_IN_SET(id, ${lineagePath})
      AND id <> ${userId}
  `;

  if (!filteredUsers.length) return [];

  const userIds = filteredUsers.map((u) => u.id);

  await prisma.bVLedger.createMany({
    data: userIds.map((uplineId) => ({
      purchase_id: data.purchase_id,
      buyer_id: data.buyer_id,
      user_id: userId,
      bv: data.bv, //not defined
      purchase_type: data.purchase_type,
      buyer_leg: data.buyer_leg ?? null,
      is_income_generated: data.is_income_generated ?? "NO",
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
    })),
    skipDuplicates: true,
  });

  const createdLedgers = await prisma.bVLedger.findMany({
    where: {
      purchase_id: data.purchase_id,
      buyer_id: data.buyer_id,
      user_id: { in: userIds },
    },
  });

  return createdLedgers;
};

//raw sql ledger code

export const createBVLedgerForLineageRaw = async (
  params: BVLedgerRawInput,
  tx: Prisma.TransactionClient,
): Promise<number> => {
  if (params.purchase_type === PurchaseType.SHARE_PURCHASE) {
    return 0;
  }

  const result = await tx.$executeRaw`
    INSERT INTO bv_ledger (
        purchase_id,
        user_id,
        buyer_id,
        bv,
        is_income_generated,
        purchase_type,
        buyer_leg,
        createdAt,
        updatedAt
    )
    SELECT
        ${params.purchase_id},
        upline.id,
        ${params.buyer_id},
        ${params.bv},
        ${params.is_income_generated === "YES" ? "1" : "0"},
        ${params.purchase_type},
        CASE 
            WHEN direct_child.legPosition = 'LEFT' THEN 'LEFT'
            ELSE 'RIGHT'
        END,
        NOW(),
        NOW()
    FROM users buyer
    JOIN users upline
        ON FIND_IN_SET(upline.id, buyer.lineagePath)
    JOIN users direct_child
        ON direct_child.parentId = upline.id
        AND FIND_IN_SET(direct_child.id, buyer.lineagePath)
    WHERE buyer.id = ${params.buyer_id}
      AND upline.id <> buyer.id
  `;

  return Number(result);
};
