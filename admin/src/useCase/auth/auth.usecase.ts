import config from "@/config";
import {
  findById,
  findByMobile,
  logoutRepo,
  storeRefreshToken,
} from "@/data/repositories/Auth.admin.repository";

import {
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/generatetoken";
import { MyJwtPayload } from "@/middleware/verifyToken";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUsecase = async (username: string, password: string) => {
  const existAdmin = await findByMobile(username);
  if (!existAdmin) {
    throw new Error("Invalid credentials");
  }
  const isPassword = await bcrypt.compare(password, existAdmin.password);
  if (!isPassword) {
    throw new Error("Invalid credentials");
  }
  const accessToken = await generateAccessToken(
    existAdmin.id,
    existAdmin.adminType,
  );
  const refreshToken = await generateRefreshToken(existAdmin.id);
  await storeRefreshToken(existAdmin.id, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

export const genAcessUsecase = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(refreshToken, config.jwtRefreshSecret);

    if (!decoded?.id) {
      throw new Error("Invalid token");
    }

    const admin = await findById(decoded.id);

    if (!admin) {
      throw new Error("Admin not found");
    }

    if (admin.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    return generateAccessToken(admin.id, admin.adminType);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

export const logoutUsecase = async (id: number) => {
  if (!id) {
    throw new Error("id is required");
  }
  await logoutRepo(id);
  return true;
};
