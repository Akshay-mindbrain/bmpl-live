import { Request, Response } from "express";
import {
  calculateTotalBvUsecase,
  getLastMonthTeamBVUsecase,
  getSelfbvUsecase,
  getTotalFirstpurchesBvusecase,
  getTotalRepurchaseBVUsecase,
} from "@/useCase/totalbv.usecase";

export const getUserTotalBVController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const result = await calculateTotalBvUsecase(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("BV Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getLastMonthTeamBVController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.userId);

    const result = await getLastMonthTeamBVUsecase(userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getTotalRepurchaseBVController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.userId);

    const result = await getTotalRepurchaseBVUsecase(userId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Repurchase BV Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
export const getTotalFirstpurchaseBVController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = Number(req.params.userId);

    const result = await getTotalFirstpurchesBvusecase(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Repurchase BV Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getSelfBVController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await getSelfbvUsecase(id);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Repurchase BV Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
