import { saveconfigController } from "@/controllers/Admin.config";
import { verifyAdmin } from "@/middleware/verifyToken";
import express from "express";
export const adminconfigRoutes = express.Router();
adminconfigRoutes.post("/save", verifyAdmin, saveconfigController);
