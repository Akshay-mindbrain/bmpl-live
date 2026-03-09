import prisma from "@/prisma-client";

// Get income commission %
export const getIncomePercentage = async () => {
  const config = await prisma.config.findFirst();

  if (!config) {
    throw new Error("Admin configuration not found");
  }

  // adjust if column name differs in schema
  return Number(config.incomeCommission ?? 0);
};
export const getRoyalityPercentage = async () => {
  const config = await prisma.config.findFirst();

  if (!config) {
    throw new Error("Admin configuration not found");
  }

  return Number(config.royaltyCommission ?? 0);
};

// Get TDS + Admin charges
export const getTDS = async () => {
  const config = await prisma.config.findFirst({
    select: {
      tds: true,
      admincharges: true,
    },
  });

  if (!config) {
    throw new Error("Admin config not found");
  }

  return {
    tds: Number(config.tds ?? 0),
    admincharges: Number(config.admincharges ?? 0),
  };
};

// Wallet carry-forward BV
export const getWalletCarryBV = async (userId: number) => {
  const wallet = await prisma.wallet.findUnique({
    where: { user_id: userId },
  });

  return {
    leftCarry: wallet?.left_carryforward_bv ?? 0,
    rightCarry: wallet?.right_carryforward_bv ?? 0,
  };
};

// Eligible users for income generation
export const elegibleForincome = async () => {
  const users = await prisma.planPurchase.findMany({
    where: {
      status: "APPROVED",
      is_income_generated: "NO",
    },
    select: { user_id: true },
    distinct: ["user_id"],
  });

  return users;
};