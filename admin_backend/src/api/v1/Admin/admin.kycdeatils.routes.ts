import {
  getAllKycController,
  getApprovedKycController,
  getRejectedKycController,
  getPendingKycController,
  getOneKyccontroller,
  updateKycStatusController,
} from "@/controllers/Admin.kycdtails.controller";
import { verifyAdmin } from "@/middleware/verifyToken";
import express from "express";

export const kycDetailsRoutes = express.Router();
kycDetailsRoutes.get("/getkycpending", verifyAdmin, getPendingKycController);
kycDetailsRoutes.get("/getkycapprove", verifyAdmin, getApprovedKycController);
kycDetailsRoutes.get("/getkycreject", verifyAdmin, getRejectedKycController);
kycDetailsRoutes.get("/getallkyc", verifyAdmin, getAllKycController);
kycDetailsRoutes.get("/onekyc/:id", verifyAdmin, getOneKyccontroller);
kycDetailsRoutes.put("/updatekycstatus/:id", updateKycStatusController);
