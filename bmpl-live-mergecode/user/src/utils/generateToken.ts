import config from "@/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpires,
  });
};

export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpires,
  });
};
