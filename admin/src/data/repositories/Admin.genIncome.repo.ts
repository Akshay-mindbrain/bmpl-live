import prisma from "@/prisma-client";
import { getUserTotalBVRepo } from "./Admin.totalbv.repo";
import {
  elegibleForincome,
  getIncomePercentage,
  getTDS,
  getWalletCarryBV,
} from "@/utils/incomeHelper";

export const getIncomeGenarateRepo = async () => {
  const eligibleUsers = await elegibleForincome();
  const incomePercentage = await getIncomePercentage();
  const { tds, admincharges } = await getTDS();

  const generateIncomeEntry = await prisma.generateIncome.create({
    data: {
      totalIncome: 0,
      netincome: 0,
      tds: 0,
      adminCharges: 0,
      generatedDate: new Date(),
    },
  });

  let totalIncome = 0;
  let totaltds = 0;
  let totalAdmincharges = 0;
  let totalNetIncome = 0;

  const result: any[] = [];

  for (const u of eligibleUsers) {
    const userId = u.user_id;

    const { leftBV, rightBV } = await getUserTotalBVRepo(userId);
    const { leftCarry, rightCarry } = await getWalletCarryBV(userId);

    const totalLeft = leftBV + leftCarry;
    const totalRight = rightBV + rightCarry;

    const matchedBv = Math.min(totalLeft, totalRight);
    if (matchedBv <= 0) continue;

    const newLeftCarry = totalLeft - matchedBv;
    const newRightCarry = totalRight - matchedBv;

    const grossIncome = (matchedBv * incomePercentage) / 100;

    const totalTds = (grossIncome * tds) / 100;
    const adminCharges = (grossIncome * admincharges) / 100;
    const netIncome = grossIncome - totalTds - adminCharges;

    totalIncome += grossIncome;
    totaltds += totalTds;
    totalAdmincharges += adminCharges;
    totalNetIncome += netIncome;

    await prisma.$transaction(async (tx) => {
      const incomeEntry = await tx.systemIncome.create({
        data: {
          user_id: userId,
          generateIncomeId: generateIncomeEntry.id,
          matched_bv: matchedBv,
          income: grossIncome,
          message_data: "Binary income generated",
          status: "ACTIVE",
        },
      });

      await tx.incomeHistory.create({
        data: {
          incomeId: generateIncomeEntry.id,
          userId,
          totalIncome: grossIncome,
          tds: totalTds,
          adminCharges,
        },
      });

      await tx.wallet.update({
        where: { user_id: userId },
        data: {
          total_left_bv: leftBV,
          total_right_bv: rightBV,
          left_carryforward_bv: newLeftCarry,
          right_carryforward_bv: newRightCarry,
          matched_bv: { increment: matchedBv },
          total_income: { increment: netIncome },
        },
      });

      await tx.walletTransaction.create({
        data: {
          user_id: userId,
          type: "INCOME",
          amount: netIncome,
          reference_id: incomeEntry.id,
          message: "Binary income created",
          status: "ACTIVE",
        },
      });

      await tx.planPurchase.updateMany({
        where: {
          user_id: userId,
          status: "APPROVED",
          is_income_generated: "NO",
        },
        data: { is_income_generated: "YES" },
      });
    });

    result.push({
      userId,
      matchedBv,
      grossIncome,
      netIncome,
    });
  }

  await prisma.generateIncome.update({
    where: { id: generateIncomeEntry.id },
    data: {
      totalIncome,
      netincome: totalNetIncome,
      tds: totaltds,
      adminCharges: totalAdmincharges,
    },
  });

  return result;
};
export const genincomeGenrepo = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.generateIncome.findMany({
      skip,
      take: limit,
      orderBy: { generatedDate: "desc" },
    }),
    prisma.generateIncome.count(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
export const incomeHistoryRepo = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const grouped = await prisma.incomeHistory.groupBy({
    by: ["userId", "incomeId"],
    _sum: {
      totalIncome: true,
      tds: true,
      adminCharges: true,
    },
  });

  const merged: Record<number, any> = {};

  for (const row of grouped) {
    if (!merged[row.userId]) {
      merged[row.userId] = {
        userId: row.userId,
        binaryIncome: 0,
        royaltyIncome: 0,
        totalTds: 0,
        totalAdminCharges: 0,
      };
    }

    if (row.incomeId === 1) {
      merged[row.userId].binaryIncome = Number(row._sum.totalIncome ?? 0);
    }

    if (row.incomeId === 2) {
      merged[row.userId].royaltyIncome = Number(row._sum.totalIncome ?? 0);
    }

    merged[row.userId].totalTds += Number(row._sum.tds ?? 0);
    merged[row.userId].totalAdminCharges += Number(row._sum.adminCharges ?? 0);
  }

  const finalData = Object.values(merged).map((user: any) => ({
    ...user,
    totalIncome: user.binaryIncome + user.royaltyIncome,
  }));

  const paginatedData = finalData.slice(skip, skip + limit);

  return {
    skip,
    page,
    limit,
    data: paginatedData,
    total: finalData.length,
    totalpage: Math.ceil(finalData.length / limit),
  };
};
