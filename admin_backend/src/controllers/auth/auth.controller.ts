import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import AppError from "@/errors/AppError";
import {
  genAcessUsecase,
  loginUsecase,
  logoutUsecase,
} from "@/useCase/auth/auth.usecase";
import { createAdminUsecase, getAdminUsecase } from "@/useCase/Admin.services";
import config from "@/config";
import { MyJwtPayload } from "@/middleware/verifyToken";

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body;

    if (!data.username || !data.password) {
      throw AppError.notFound("all field required");
    }
    const { accessToken, refreshToken } = await loginUsecase(
      data.username,
      data.password,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      msg: "Login successful",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const RegenAccessToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw AppError.unauthorized("token not found");
    }

    const accessToken = await genAcessUsecase(token);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      msg: "Access token generated successfully",
      accessToken,
    });
  } catch (error: any) {
    throw AppError.internal(error);
  }
};

export const createAdmincontroller = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const admin = await createAdminUsecase(req.body);

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error: any) {
    console.log("ERROR:", error);

    if (error.status) {
      res.status(error.status).json({
        msg: error.message,
      });
      return;
    }

    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// export const updateAdminController = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const id = parseInt(req.params.id);

//     if (isNaN(id)) {
//       throw AppError.notFound("invality id");
//     }

//     const updatedAdmin: UpdateAdminDTO = await updateAdminUsecase(id, req.body);

//     res.status(200).json({
//       msg: "User updated successfully",
//       updatedAdmin,
//     });
//   } catch (error: any) {
//     if (error.code === "P2025") {
//       res.status(404).json({
//         msg: "Admin not found",
//       });
//       return;
//     }

//     console.error(error);
//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// };

// export const deleteAdminController = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const id = Number(req.params.id);

//     if (!id) {
//       throw AppError.notFound("id is required");
//     }

//     await deleteAdminUsecase(id);
//     res.status(201).json({ msg: "deleted admin sucessfully" });

//     throw AppError;
//   } catch (error: any) {
//     if (error.code === "P2025") {
//       res.status(404).json({
//         msg: "Admin not found",
//       });
//       return;
//     }

//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// };

export const logoutController = async (req: Request, res: Response) => {
  try {
    const token = req?.cookies?.accessToken;
    if (!token) {
      throw AppError.notFound("token not found");
    }
    const decode = jwt.verify(
      token,
      config.jwtAccessSecret as string,
    ) as MyJwtPayload;
    const adminId = decode?.id;
    if (!adminId) {
      throw AppError.notFound("admin id is required");
    }
    await logoutUsecase(adminId);
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({
      msg: "Logout successful",
    });
  } catch (error: any) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
