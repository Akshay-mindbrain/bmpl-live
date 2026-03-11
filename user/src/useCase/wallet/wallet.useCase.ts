import AppError from "@/errors/AppError";
import { Prisma } from "@prisma/client";
import { getUserWallets } from "@/data/repositories/wallet.Repository";

export const getUserWalletDetails = async (
  userId: number,
  tx: Prisma.TransactionClient,
) => {
  if (!userId) {
    throw AppError.badRequest("UserId is required");
  }

  const wallets = await getUserWallets(userId, tx);

  if (!wallets.length) {
    return {
      totalWallets: 0,
      data: [],
    };
  }

  const formatted = wallets.map((wallet) => ({
    ...wallet,
    total_income: Number(wallet.total_income),
    total_withdraw: Number(wallet.total_withdraw),
    total_dp_amount: Number(wallet.total_dp_amount),
    balance_dp_amount: Number(wallet.balance_dp_amount),
    super_coins: Number(wallet.super_coins),
    used_super_coins: Number(wallet.used_super_coins),
  }));

  return {
    totalWallets: formatted.length,
    data: formatted,
  };
};