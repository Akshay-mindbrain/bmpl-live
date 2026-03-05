import express, { Router } from "express";
import health from "./health";
//import authRouter from "./auth";
import { adminRouter } from "./Admin/Admin.routes";
import { adminAuthRouter } from "./Auth/Adminauth.routes";
import { userManageRoutes } from "./Admin/Admin.user.managment.routes";
import { adminplanRouter } from "./planmaster/Admin.plan.routes";
import { adminconfigRoutes } from "./Admin/Admin.config.routes";
import { kycDetailsRoutes } from "./Admin/admin.kycdeatils.routes";
import { bvRouter } from "./Bvmaster/calculatebv.routes";
import { incomeRouter } from "./income/incomegenarate.routes";
import { royalityRouter } from "./royalityIncome/royalityINcome.routes";
import { payoutRouter } from "./payout/payout.routes";
import { rewardRouter } from "./reward/reward.routes";
const v1: Router = express.Router();

v1.use("/health", health);

//v1.use("/auth", authRouter);

//admin protected routes

v1.use("/admin", adminRouter);
v1.use("/admin", adminAuthRouter);
v1.use("/user", userManageRoutes);
v1.use("/plan", adminplanRouter);
v1.use("/config", adminconfigRoutes);
v1.use("/kyc", kycDetailsRoutes);
v1.use("/bv", bvRouter);
v1.use("/income", incomeRouter);
v1.use("/royality", royalityRouter);
v1.use("/payout", payoutRouter);
v1.use("/reward", rewardRouter);
export default v1;
