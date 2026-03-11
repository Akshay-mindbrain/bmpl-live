import { Request, Response, NextFunction } from "express";
import * as userService from "../useCase/Users.useCase";
import { AuthRequest } from "../middleware/authenticate-user";
import logger from "@/logger";
import AppError from "@/errors/AppError";
import type { getUserByIdResDTO } from "../dto";
export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user as getUserByIdResDTO,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();

    const responseUsers: getUserByIdResDTO[] = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      memberId: user.memberId ?? "",
      legPosition: user.legPosition ?? "",
      status: user.status,
    }));

    res.status(200).json({
      success: true,
      data: responseUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }
    
    const userId = res.locals.user.id;
    const user = await userService.getUserById(userId);


    const responseUser: getUserByIdResDTO = {
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      memberId: user.memberId ?? "",
      legPosition: user.legPosition ?? "",
      status: user.status,
    };

    res.status(200).json({
      success: true,
      data: responseUser,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;

    const updatedUser = await userService.updateUser(userId, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;
    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//Helper Controller
export const getDownline = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;

    const users = await userService.getAllDownlineByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Downline users fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUpline = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;

    const users = await userService.getAllUpLineByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Upline users fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getLastNodeByLegController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!res.locals.user?.id) {
      throw AppError.unauthorized("User not authenticated");
    }

    const userId = res.locals.user.id;
    const legPosition = req.body.legPosition as "LEFT" | "RIGHT";

    if (!userId || !["LEFT", "RIGHT"].includes(legPosition)) {
      res.status(400).json({
        success: false,
        message: "Invalid userId or legPosition",
      });
      return;
    }

    const lastNode = await userService.updateLastNodeByLeg(userId, legPosition);

    if (!lastNode) {
      res.status(404).json({
        success: false,
        message: "No node found for given leg",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lastNode,
    });
  } catch (error) {
    console.error("getLastNodeByLeg error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
