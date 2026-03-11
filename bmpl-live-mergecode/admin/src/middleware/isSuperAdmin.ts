import { AdminType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const admin = (req as any).admin;

  if (!admin || admin.adminType !== AdminType.SUPERADMIN) {
    res.status(403).json({
      msg: "Only Super Admin allowed",
    });
    return;
  }

  next();
};
