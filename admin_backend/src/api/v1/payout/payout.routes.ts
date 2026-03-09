import {
  generatePayoutController,
  payoutController,
  payouthistoryController,
} from "@/controllers/payout.controller";
import express from "express";
export const payoutRouter = express.Router();
payoutRouter.post("/generate", generatePayoutController);
payoutRouter.get("/get", payoutController);
payoutRouter.get("/history", payouthistoryController);
