import { Prisma } from "@prisma/client";

export const getUserWallets = async (
  userId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.wallet.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
