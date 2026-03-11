import { royalityController } from "@/controllers/royalityincome.controller";
import express from "express";
export const royalityRouter = express.Router();
royalityRouter.post("/generate", royalityController);
