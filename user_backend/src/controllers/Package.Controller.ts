//This is Plan_master Controller [if required change the naming of this Controller in future]
import { Request, Response, NextFunction } from "express";
import * as PackageService from "../useCase/Package.useCase";
import { PlansMasterResponseDto } from "../dto";

export const createPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Controller is being hit outside try block ");
  try {
    console.log("Controller is being hit inside try block before result ");

    const result = await PackageService.createPackage(req.body);

    console.log("Controller is being hit inside try block after result ");

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPackagesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await PackageService.getAllPlansMaster();

    res.status(200).json({
      success: true,
      data: result as PlansMasterResponseDto[],
    });
  } catch (error) {
    next(error);
  }
};

export const getPackageByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await PackageService.getPackageById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePackageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await PackageService.updatePackage(id, req.body);

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePackageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await PackageService.deletePackage(id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
