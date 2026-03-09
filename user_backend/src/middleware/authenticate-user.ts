import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";

interface JwtUserPayload extends JwtPayload {
  id: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.userAccessToken as string | undefined;

  if (!token) {
    return next(AppError.unauthorized("Authentication cookie missing"));
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessSecret as string);

    if (typeof decoded === "string" || !("id" in decoded)) {
      return next(AppError.unauthorized("Invalid token payload"));
    }

    const payload = decoded as JwtUserPayload;

    res.locals.user = {
      id: payload.id,
    };

    next();
  } catch {
    return next(AppError.unauthorized("Session expired or invalid token"));
  }
};

export default authenticateUser;
