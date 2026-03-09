import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "@/errors/AppError";
import {
  generateAccessUsecase,
  loginUsecase,
  logoutUsecase,
} from "@/useCase/auth/auth.usecase";
import config from "@/config";
import { parseTTLToMs } from "@/utils/parseTTL";
import { AuthUser } from "@/types/express";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      throw AppError.badRequest("Mobile and password are required");
    }

    const { accessToken, refreshToken, user } = await loginUsecase( 
      mobile,
      password,
    );

    const accessMaxAge = parseTTLToMs(config.jwtAccessExpires);
    const refreshMaxAge = parseTTLToMs(config.jwtRefreshExpires);

    res.cookie("userAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: accessMaxAge,
      path: "/",
    });

    res.cookie("userRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: refreshMaxAge,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};

export const RegenAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies.userRefreshToken;

    if (!refreshToken) {
      throw AppError.unauthorized("Refresh token missing");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessUsecase(refreshToken);

    const accessMaxAge = parseTTLToMs(config.jwtAccessExpires);
    const refreshMaxAge = parseTTLToMs(config.jwtRefreshExpires);

    res.cookie("userAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: accessMaxAge,
      path: "/",
    });

    res.cookie("userRefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: refreshMaxAge,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });

  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.userAccessToken;

    if (!token) {
      throw AppError.unauthorized("Access token missing");
    }

    const decoded = jwt.verify(
      token,
      config.jwtAccessSecret
    ) as AuthUser;

    await logoutUsecase(decoded.id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    res.clearCookie("userAccessToken", cookieOptions);
    res.clearCookie("userRefreshToken", cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    next(error); 
  }
};