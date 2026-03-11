import prisma from "@/prisma-client";

export const rewardrepo = async () => {
  const wallets = await prisma.wallet.findMany({
    select: {
      user_id: true,
      matched_bv: true,
    },
  });

  const rewards = await prisma.rewardConfig.findMany({
    where: { status: "ACTIVE" },
    orderBy: { matchedBV: "asc" },
  });

  const rewardResults: any[] = [];

  for (const wallet of wallets) {
    for (const reward of rewards) {
      if (wallet.matched_bv >= reward.matchedBV) {
        const alreadyGiven = await prisma.rewardHistory.findFirst({
          where: {
            userId: wallet.user_id,
            rewardId: reward.id,
          },
        });

        if (!alreadyGiven) {
          await prisma.rewardHistory.create({
            data: {
              userId: wallet.user_id,
              matchedBV: reward.matchedBV,
              rewardId: reward.id,
              giftName: reward.giftName,
            },
          });

          rewardResults.push({
            userId: wallet.user_id,
            giftName: reward.giftName,
            matchedBV: reward.matchedBV,
          });
        }
      }
    }
  }

  return {
    success: true,
    count: rewardResults.length,
    rewards: rewardResults,
  };
};

export const getRewardHistory = () => {
  return prisma.rewardHistory.findMany();
};
