import {
  getUserController,
  updateUserController,
  updateUserstatusController,
} from "@/controllers/admin/Admin.user.mangment.controller";
import { verifyAdmin } from "@/middleware/verifyToken";
import express from "express";

export const userManageRoutes = express.Router();
userManageRoutes.get("/getuser", verifyAdmin, getUserController);
userManageRoutes.put("/status/:id", verifyAdmin, updateUserstatusController);
userManageRoutes.put("/update/:id", verifyAdmin, updateUserController);
