import AppError from "@/errors/AppError";
import {
  genincomeUsecase,
  incomeHistoryUsecase,
  inocomeGenerateUsecase,
} from "@/useCase/income.generate.usecase";
import { Request, Response } from "express";

export const IncomegenController = async (req: Request, res: Response) => {
  try {
    const data = await inocomeGenerateUsecase();
    if (!data) {
      throw AppError.notFound("income is not generated");
    }
    res.status(201).json({ msg: "income generated sucessfuly", data });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};

export const generateincomeController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);
    const data = await genincomeUsecase(page, limit);
    res.status(201).json({ msg: "incomegenerate found sucessfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const incomeHistoryController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);
    const data = await incomeHistoryUsecase(page, limit);
    res.status(201).json({ msg: "incomegenerate found sucessfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
