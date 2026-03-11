import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "@/config";
export interface MyJwtPayload extends JwtPayload {
  id: number;
}
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({
        msg: "Unauthorized - token missing",
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwtAccessSecret as string);

    (req as any).admin = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};
