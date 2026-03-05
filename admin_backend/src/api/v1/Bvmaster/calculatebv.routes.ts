import {
  getLastMonthTeamBVController,
  getSelfBVController,
  getTotalFirstpurchaseBVController,
  getTotalRepurchaseBVController,
  getUserTotalBVController,
} from "@/controllers/totalbv.controller";
import { verifyAdmin } from "@/middleware/verifyToken";
import express from "express";
export const bvRouter = express.Router();
bvRouter.post("/calculate/:userId", verifyAdmin, getUserTotalBVController);
bvRouter.post(
  "/getlastmonth/:userId",
  verifyAdmin,
  getLastMonthTeamBVController,
);
bvRouter.post(
  "/getrepurchesbv/:userId",
  verifyAdmin,
  getTotalRepurchaseBVController,
);
bvRouter.post(
  "/getfirstpurches/:userId",
  verifyAdmin,
  getTotalFirstpurchaseBVController,
);
bvRouter.post("/selfbv/:id", verifyAdmin, getSelfBVController);
