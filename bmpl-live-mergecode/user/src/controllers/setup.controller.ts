import { NextFunction, Request, Response } from "express";
import { initializeUserSetup } from "@/useCase/setup/setup.useCase";

export const initializeSetupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const setupResult = await initializeUserSetup(req.body);

    res.status(201).json({
      success: true,
      message: "Setup completed successfully.",
      data: setupResult,
    });
  } catch (error) {
    next(error);
  }
};
