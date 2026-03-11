import { createBVLedgerForLineageRaw } from "@/data/repositories/BVledger.Repository";
import AppError from "@/errors/AppError";
import { Prisma } from "@prisma/client";

export const consumeSharePurchase = async (
  sponsorId: number,
  newUserId: number,
  tx: Prisma.TransactionClient,
) => {
  // 1️⃣ Find RESERVED share purchase
  const sharePurchase = await tx.planPurchase.findFirst({
    where: {
      user_id: sponsorId,
      purchase_type: "SHARE_PURCHASE",
      status: "APPROVED",
      share_status: "RESERVED",
    },
    orderBy: { createdAt: "asc" },
  });

  if (!sharePurchase)
    throw AppError.badRequest("No reserved share purchase found");

  // 2️⃣ Create FIRST_PURCHASE for new user
  const firstPurchase = await tx.planPurchase.create({
    data: {
      plan_id: sharePurchase.plan_id,
      user_id: newUserId,
      BV: sharePurchase.BV,
      dp_amount: sharePurchase.dp_amount,
      plan_amount: sharePurchase.plan_amount,

      purchase_type: "FIRST_PURCHASE",
      status: "APPROVED",
      approve_status: "AUTO",
      approved_at: new Date(),
      is_income_generated: "NO",

      parent_purchase_id: sharePurchase.id,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
    },
  });

  // 3️⃣ Mark sponsor share as consumed
  await tx.planPurchase.update({
    where: { id: sharePurchase.id },
    data: {
      share_status: "TRANSFERRED",
      transferred_to_user_id: newUserId,
      transferred_at: new Date(),
    },
  });

  await createBVLedgerForLineageRaw(
    {
      purchase_id: firstPurchase.id,
      buyer_id: newUserId,
      bv: firstPurchase.BV,
      purchase_type: firstPurchase.purchase_type,
      is_income_generated: "NO",
    },
    tx,
  );

  return firstPurchase;
};
