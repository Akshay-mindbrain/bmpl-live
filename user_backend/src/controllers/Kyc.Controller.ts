import { Request, Response, NextFunction } from "express";
import * as KycService from "../useCase/Kyc.useCase";
import AppError from "@/errors/AppError";

export const createKycController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }
    const userId = res.locals.user.id;
    const result = await KycService.createKyc(userId, req.body);

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllKycController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;
    const result = await KycService.getAllKyc(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getKycByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await KycService.getKycById(Number(id));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getKycByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }
    const userId = res.locals.user.id;

    const result = await KycService.getKycByUserId(Number(userId));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateKycController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }
    const userId = res.locals.user.id;

    const result = await KycService.updateKyc(Number(userId), req.body);

    res.status(200).json({
      success: true,
      message: "KYC record updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteKycController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;

    await KycService.deleteKyc(userId);

    res.status(200).json({
      success: true,
      message: "KYC record deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};
