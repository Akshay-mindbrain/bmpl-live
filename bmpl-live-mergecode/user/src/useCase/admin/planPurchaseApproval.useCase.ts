import { Prisma, PurchaseType } from "@prisma/client";
import prisma from "@/prisma-client";
import AppError from "@/errors/AppError";
import { createBVLedgerForLineageRaw } from "@/data/repositories/BVledger.Repository";

export const approvePlanPurchase = async (
  purchaseId: number,
  tx?: Prisma.TransactionClient,
) => {
  if (tx) {
    // 🔹 Already inside transaction
    const purchase = await tx.planPurchase.findUnique({
      where: { id: purchaseId },
      include: { user: true },
    });

    if (!purchase) throw AppError.notFound("Purchase not found");

    if (purchase.status === "APPROVED")
      throw AppError.badRequest("Purchase already approved");

    const updatedPurchase = await tx.planPurchase.update({
      where: { id: purchaseId },
      data: {
        status: "APPROVED",
        approved_at: new Date(),
        approve_status: "MANUALADMIN",
      },
    });

    if (purchase.purchase_type !== PurchaseType.SHARE_PURCHASE) {
      await createBVLedgerForLineageRaw(
        {
          purchase_id: purchase.id,
          buyer_id: purchase.user_id,
          bv: purchase.BV,
          purchase_type: purchase.purchase_type,
          is_income_generated: "NO",
        },
        tx,
      );
    }

    return updatedPurchase;
  }

  // 🔹 Not inside transaction → create one
  return prisma.$transaction(async (trx) => {
    const purchase = await trx.planPurchase.findUnique({
      where: { id: purchaseId },
      include: { user: true },
    });

    if (!purchase) throw AppError.notFound("Purchase not found");

    if (purchase.status === "APPROVED")
      throw AppError.badRequest("Purchase already approved");

    const updatedPurchase = await trx.planPurchase.update({
      where: { id: purchaseId },
      data: {
        status: "APPROVED",
        approved_at: new Date(),
        approve_status: "MANUALADMIN",
      },
    });

    if (purchase.purchase_type !== PurchaseType.SHARE_PURCHASE) {
      await createBVLedgerForLineageRaw(
        {
          purchase_id: purchase.id,
          buyer_id: purchase.user_id,
          bv: purchase.BV,
          purchase_type: purchase.purchase_type,
          is_income_generated: "NO",
        },
        trx,
      );
    }

    return updatedPurchase;
  });
};
