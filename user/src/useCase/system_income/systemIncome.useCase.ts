import { Prisma } from "@prisma/client";
import { getUserIncomeByDateRange } from "@/data/repositories/SystemIncome.repository";
import AppError from "@/errors/AppError";

export type IncomePeriod = "LAST_7_DAYS" | "LAST_30_DAYS" | "THIS_MONTH";

interface IncomeQueryInput {
  period?: IncomePeriod;
  fromDate?: string;
  toDate?: string;
}

export const getUserIncome = async (
  userId: number,
  input: IncomeQueryInput | undefined,
  tx: Prisma.TransactionClient,
) => {
  if (!userId) {
    throw AppError.badRequest("UserId is required");
  }

  if (!input) {
    throw AppError.badRequest("Input is required");
  }

  let fromDate: Date;
  let toDate: Date;

  // ❗ Prevent both being sent together
  if (input.period && (input.fromDate || input.toDate)) {
    throw AppError.badRequest(
      "Provide either period OR fromDate and toDate, not both",
    );
  }

  // 🔥 Case 1: Period-based
  if (input.period) {
    const now = new Date();
    toDate = now;

    switch (input.period) {
      case "LAST_7_DAYS":
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 7);
        break;

      case "LAST_30_DAYS":
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 30);
        break;

      case "THIS_MONTH":
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;

      default:
        throw AppError.badRequest("Invalid period");
    }
  } else if (input.fromDate && input.toDate) {
    fromDate = new Date(input.fromDate);
    toDate = new Date(input.toDate);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw AppError.badRequest("Invalid date format");
    }

    if (fromDate > toDate) {
      throw AppError.badRequest("Invalid date range");
    }
  } else {
    throw AppError.badRequest("Provide either period OR fromDate and toDate");
  }

  return getUserIncomeByDateRange(userId, fromDate, toDate, tx);
};
