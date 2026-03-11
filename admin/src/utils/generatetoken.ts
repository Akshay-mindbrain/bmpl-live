import config from "@/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number, adminType: string) => {
  return jwt.sign({ id, adminType }, config.jwtAccessSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, config.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};
