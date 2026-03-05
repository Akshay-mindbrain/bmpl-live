import {
  generatePayoutRepo,
  getpayoutrepo,
  payoutHistory,
} from "@/data/repositories/payout.repo";
import prisma from "@/prisma-client";
import { getTDS } from "@/utils/incomeHelper";

export const generatePayoutUsecase = async () => {
  return prisma.$transaction(async (tx) => {
    const config = await getTDS();
    const tds = config.tds;
    const adminCharges = config.admincharges;
    const { payout, eligibleUsers } = await generatePayoutRepo(tx);

    let totalPayoutAmount = 0;
    let totalTds = 0;
    let totalAdminCharge = 0;

    for (const wallet of eligibleUsers) {
      const totalAmount = Number(wallet.total_income);

      const tdsAmount = (totalAmount * tds) / 100;
      const adminCharge: any = (totalAmount * adminCharges) / 100;
      const netAmount = totalAmount - tdsAmount - adminCharges;

      totalPayoutAmount += netAmount;
      totalTds += tdsAmount;
      totalAdminCharge += adminCharge;

      await tx.usersPayoutHistory.create({
        data: {
          userId: wallet.user.id,
          payoutId: payout.id,
          totalAmount,
          tdsAmount,
          adminCharges,
          netAmount,
          status: "ACTIVE",
        },
      });
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          total_income: 0,
          total_withdraw: { increment: totalPayoutAmount },
        },
      });
    }
    await tx.payout.update({
      where: { id: payout.id },
      data: {
        totalAmount: totalPayoutAmount,
        tds: totalTds,
        adminCharges: totalAdminCharge,
        netAmount: totalPayoutAmount,
      },
    });

    return payout;
  });
};

export const payoutUsecase = async (page: number, limit: number) => {
  if (!page || page < 1) page = 1;
  if (!limit) limit = 10;
  if (limit > 100) limit = 100;
  return await getpayoutrepo(page, limit);
};

export const payoutHistoryUsecase = async (page: number, limit: number) => {
  if (!page || page < 1) page = 1;
  if (!limit) limit = 10;
  if (limit > 100) limit = 100;
  return await payoutHistory(page, limit);
};
