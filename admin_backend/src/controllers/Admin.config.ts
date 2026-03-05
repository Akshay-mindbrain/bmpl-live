import AppError from "@/errors/AppError";
import { saveAdminConfigUsecase } from "@/useCase/Admin.config.usecase";
import { Request, Response } from "express";

export const saveconfigController = async (req: Request, res: Response) => {
  try {
    const data = await saveAdminConfigUsecase(req.body);
    if (!data) {
      throw AppError.badRequest("data not created or updated");
    }
    res.status(200).json({ msg: "config manage sucesfully", data });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};
