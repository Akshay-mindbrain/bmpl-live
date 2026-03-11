import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken as string | undefined;

  if (!token) {
    return next(AppError.unauthorized("Authentication cookie is missing"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessSecret) as {
      id: number;
      username: string;
    };
    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    next(AppError.unauthorized("Session expired or invalid token"));
  }
};

export default authenticateUser;
