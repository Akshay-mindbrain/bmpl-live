import { validate } from "../../../middleware/validate-request";
import {
  createAdmincontroller,
  logoutController,
} from "@/controllers/auth/auth.controller";
import {
  RegenAccessToken,
  loginController,
} from "@/controllers/auth/auth.controller";
import { adminLoginSchema, adminRegisterSchema } from "@/data/request-schemas";
import { isSuperAdmin } from "@/middleware/isSuperAdmin";
import { verifyAdmin } from "@/middleware/verifyToken";

import express from "express";

export const adminAuthRouter = express.Router();
adminAuthRouter.post(
  "/register",
  // verifyAdmin,
  // isSuperAdmin,
  validate(adminRegisterSchema),
  createAdmincontroller,
);

adminAuthRouter.post("/login", validate(adminLoginSchema), loginController);
adminAuthRouter.post("/refresh", RegenAccessToken);
adminAuthRouter.post("/logout", logoutController);
