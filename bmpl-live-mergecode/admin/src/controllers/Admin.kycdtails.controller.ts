import { Request, Response } from "express";
import {
  getPendingKycUsecase,
  getApprovedKycUsecase,
  getRejectedKycusecase,
  getAllKycusecase,
  getOneKycusecase,
  updateKYcstatusUsecase,
} from "@/useCase/Admin.kycdetails.usecase";
import AppError from "@/errors/AppError";
export const getPendingKycController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getPendingKycUsecase(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getApprovedKycController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getApprovedKycUsecase(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRejectedKycController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getRejectedKycusecase(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllKycController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getAllKycusecase(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOneKyccontroller = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw AppError.notFound("id is required");
    }
    const data = await getOneKycusecase(id);
    res.status(200).json({ msg: "data created sycessfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
export const updateKycStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      throw AppError.notFound("id is required");
    }
    const { remark, action } = req.body;
    const kycstatus = await updateKYcstatusUsecase(id, action, remark);
    res.status(200).json({
      message:
        action === "APPROVE"
          ? "KYC approved successfully"
          : "KYC rejected successfully",
      kycstatus,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
