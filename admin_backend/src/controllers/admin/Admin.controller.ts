import { Request, Response } from "express";
import { UpdateAdminDTO } from "@/dto";
import AppError from "@/errors/AppError";
import jwt from "jsonwebtoken";
import config from "@/config";
import {
  deleteAdminUsecase,
  getAdminUsecase,
  updateAdminUsecase,
} from "@/useCase/Admin.services";
import { MyJwtPayload } from "@/middleware/verifyToken";

export const getAdmincontroller = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw AppError.unauthorized("token not");
    }

    const decode = jwt.verify(
      token,
      config.jwtAccessSecret as string,
    ) as MyJwtPayload;

    if (!decode?.id) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }

    const Admin = await getAdminUsecase(decode.id);

    if (!Admin) {
      res.status(404).json({ msg: "Admin not found" });
      return;
    }

    res.status(200).json({
      msg: "Admin fetched successfully",
      Admin,
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};

export const updateAdminController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw AppError.notFound("id not found");
    }

    const updatedAdmin: UpdateAdminDTO = await updateAdminUsecase(id, req.body);

    res.status(200).json({
      msg: "User updated successfully",
      updatedAdmin,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({
        msg: "Admin not found",
      });
      return;
    }

    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const deleteAdminController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      throw AppError.notFound("invality id");
    }

    await deleteAdminUsecase(id);

    res.status(200).json({
      msg: "Admin deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({
        msg: "Admin not found",
      });
      return;
    }

    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
