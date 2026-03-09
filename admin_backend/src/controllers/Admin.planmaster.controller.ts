import AppError from "@/errors/AppError";
import prisma from "@/prisma-client";
import {
  createPlanUsecase,
  deleteplanusecase,
  getplanByIdUsecase,
  getPlanUsecase,
  updatePlanUSecase,
} from "@/useCase/Admin.planmaster.usecase";
import { Request, Response } from "express";

export const createPlancontroller = async (req: Request, res: Response) => {
  try {
    const { planName, Description, BV, price, dp_amount, features } = req.body;
    const isExistplan = await prisma.plansMaster.findUnique({
      where: { planName },
    });
    if (isExistplan) {
      throw AppError.conflict("plan already exist");
    }

    const plan = await createPlanUsecase({
      planName,
      Description,
      BV,
      price,
      dp_amount,
      features,
    });

    res.status(201).json(plan);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getplancontroller = async (req: Request, res: Response) => {
  try {
    const plan = await getPlanUsecase();
    if (!plan) {
      throw AppError.notFound("plan not found");
    }
    res.status(200).json({ msg: "plan get sucessfully", plan });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPlanbyidcontrooler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw AppError.notFound("id not found");
    }
    const plan = await getplanByIdUsecase(id);
    res.status(201).json({ msg: "plan fetch sucessfully", plan });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePlancontroller = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw AppError.notFound("id not found");
    }
    const updateplan = await updatePlanUSecase(id, req.body);
    if (!updateplan) {
      throw AppError.notFound("plan not found");
    }
    res.status(200).json({ msg: "upadate user sucessfully", updateplan });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};
export const deleteplancontroller = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw AppError.notFound("id is required");
    }
    const deleteplan = await deleteplanusecase(id);
    res.status(200).json({ msg: "deleted sycessfully" });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};
