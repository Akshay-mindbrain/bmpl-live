import {
  getrewardcontroller,
  rewardcontroller,
} from "@/controllers/reword.controller";
import express from "express";
export const rewardRouter = express.Router();
rewardRouter.post("/generate", rewardcontroller);
rewardRouter.get("/rewardhistory", getrewardcontroller);
