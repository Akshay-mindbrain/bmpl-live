import AppError from "@/errors/AppError";
import prisma from "@/prisma-client";
import { Prisma } from "@prisma/client";

export const reserveSharePurchase = async (
  sponsorId: number,
  tx: Prisma.TransactionClient,
) => {
  const sharePurchase = await tx.planPurchase.findFirst({
    where: {
      user_id: sponsorId,
      purchase_type: "SHARE_PURCHASE",
      status: "APPROVED",
      share_status: "AVAILABLE",
    },
    orderBy: { createdAt: "asc" },
  });

  if (!sharePurchase)
    throw AppError.badRequest("Sponsor has no available share purchase");

  await tx.planPurchase.update({
    where: { id: sharePurchase.id },
    data: { share_status: "RESERVED" },
  });

  return sharePurchase;
};
