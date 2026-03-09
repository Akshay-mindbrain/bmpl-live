import AppError from "@/errors/AppError";
import { Prisma } from "@prisma/client";

export const createSystemIncome = async (
  userId: number,
  matchedBV: number,
  incomeAmount: number,
  message: string | null,
  tx: Prisma.TransactionClient,
) => {
  if (!userId || !matchedBV || !incomeAmount) {
    throw AppError.badRequest("Missing required fields");
  }

  return tx.systemIncome.create({
    data: {
      matched_bv: matchedBV,
      income: new Prisma.Decimal(incomeAmount),
      message_data: message,
      status: "ACTIVE",
      user: {
        connect: { id: userId },
      },
    },
  });
};


export const getUserIncomeByDateRange = async (
  userId: number,
  fromDate: Date,
  toDate: Date,
  tx: Prisma.TransactionClient,
) => {
  return tx.systemIncome.findMany({
    where: {
      user_id: userId,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export type IncomePeriod =
  | "LAST_2_DAYS"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "THIS_MONTH";

export const getUserIncomeByPeriod = async (
  userId: number,
  period: IncomePeriod,
  tx: Prisma.TransactionClient,
) => {
  if (!userId) {
    throw AppError.badRequest("UserId is required");
  }

  const now = new Date();
  let fromDate = new Date();

  switch (period) {
    case "LAST_2_DAYS":
      fromDate.setDate(now.getDate() - 2);
      break;

    case "LAST_7_DAYS":
      fromDate.setDate(now.getDate() - 7);
      break;

    case "LAST_30_DAYS":
      fromDate.setDate(now.getDate() - 30);
      break;

    case "THIS_MONTH":
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    default:
      throw AppError.badRequest("Invalid period");
  }

  return tx.systemIncome.findMany({
    where: {
      user_id: userId,
      createdAt: {
        gte: fromDate,
        lte: now,
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateSystemIncomeStatus = async (
  incomeId: number,
  status: "ACTIVE" | "INACTIVE",
  tx: Prisma.TransactionClient,
) => {
  if (!incomeId) {
    throw AppError.badRequest("Income id is required");
  }

  return tx.systemIncome.update({
    where: { id: incomeId },
    data: { status },
  });
};

export const deleteSystemIncome = async (
  incomeId: number,
  tx: Prisma.TransactionClient,
) => {
  if (!incomeId) {
    throw AppError.badRequest("Income id is required");
  }

  return tx.systemIncome.delete({
    where: { id: incomeId },
  });
};
