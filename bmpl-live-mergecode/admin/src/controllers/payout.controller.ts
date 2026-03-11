import {
  generatePayoutUsecase,
  payoutHistoryUsecase,
  payoutUsecase,
} from "@/useCase/payout.usecase";
import { Request, Response } from "express";

export const generatePayoutController = async (req: Request, res: Response) => {
  try {
    const result = await generatePayoutUsecase();

    res.status(200).json({
      success: true,
      message: "Payout generated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payout generation failed",
    });
  }
};

export const payoutController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);
    const data = await payoutUsecase(page, limit);
    res.status(201).json({ msg: "payout found sucessfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const payouthistoryController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);
    const data = await payoutHistoryUsecase(page, limit);
    res.status(201).json({ msg: "payouthistory found sucessfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
