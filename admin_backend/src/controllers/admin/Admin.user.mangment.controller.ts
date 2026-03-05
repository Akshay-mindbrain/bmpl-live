import AppError from "@/errors/AppError";
import {
  getUsersUsecase,
  updateUserStatusUsecase,
  updateUserUsecase,
} from "@/useCase/Admin.user.mangment.usecase";
import { Request, Response } from "express";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;
    if (limit > 100) limit = 100;
    const users = await getUsersUsecase(search, page, limit);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      ...users,
    });
  } catch (error: any) {
    console.error(error);
    throw AppError.internal(error);
  }
};

export const updateUserstatusController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      throw AppError.notFound("User not found");
    }

    const { status } = req.body;

    if (!status) {
      throw AppError.badRequest("Status required");
    }

    const user = await updateUserStatusUsecase(id, status);

    res.status(200).json({
      msg: "Status updated successfully",
      user,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({
        msg: "User not found",
      });
    }

    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      throw AppError.notFound("id not found");
    }

    const user = await updateUserUsecase(id, req.body);

    res.status(200).json({
      msg: "User updated successfully",
      user,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
