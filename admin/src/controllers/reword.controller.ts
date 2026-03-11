import AppError from "@/errors/AppError";
import {
  rewardhistoryHistryusecase,
  rewordUsecase,
} from "@/useCase/rewards.usecase";
import { Request, Response } from "express";

export const rewardcontroller = async (req: Request, res: Response) => {
  try {
    const reward = await rewordUsecase();
    res.status(201).json({ msg: "rewrd get secessfully", reward });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};

export const getrewardcontroller = async (req: Request, res: Response) => {
  try {
    const reward = await rewardhistoryHistryusecase();
    res.status(201).json({ msg: "rewrd get secessfully", reward });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};
