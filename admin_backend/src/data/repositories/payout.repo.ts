import prisma from "@/prisma-client";

export const generatePayoutRepo = async (tx: any) => {
  const payout = await tx.payout.create({
    data: {
      payoutDate: new Date(),
      payoutCycle: "FEB-2026",
      totalAmount: 0,
      tds: 0,
      adminCharges: 0,
      netAmount: 0,
      status: "ACTIVE",
    },
  });

  const eligibleUsers = await tx.wallet.findMany({
    where: {
      total_income: { gt: 500 },
      user: {
        status: "ACTIVE",
        kycStatus: "APPROVED",
      },
    },
    include: { user: true },
  });
  console.log(eligibleUsers);

  return { payout, eligibleUsers };
};

export const getpayoutrepo = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.payout.findMany({
      skip,
      take: limit,
    }),
    prisma.payout.count(),
  ]);
  return {
    page,
    total,
    limit,
    data,
    totalpage: Math.ceil(total / limit),
  };
};

export const payoutHistory = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.usersPayoutHistory.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.usersPayoutHistory.count(),
  ]);
  return {
    skip,
    limit,
    page,
    data,
    total,
    taoatlpage: Math.ceil(total / limit),
  };
};
