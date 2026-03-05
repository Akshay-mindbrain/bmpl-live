import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma-client";
import AppError from "@/errors/AppError";
import { getUserIncome } from "@/useCase/system_income/systemIncome.useCase";

export const getUserIncomeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.user?.id;

    if (!userId) {
      throw AppError.unauthorized("Unauthorized");
    }

    const result = await prisma.$transaction((tx) =>
      getUserIncome(userId, req.body, tx),
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};