import {
  deleteAdminController,
  getAdmincontroller,
  updateAdminController,
} from "@/controllers/admin/Admin.controller";

import { verifyAdmin } from "@/middleware/verifyToken";

import express from "express";

export const adminRouter = express.Router();
adminRouter.get("/get", verifyAdmin, getAdmincontroller);
adminRouter.put("/update/:id", verifyAdmin, updateAdminController);
adminRouter.delete("/delete/:id", verifyAdmin, deleteAdminController);
