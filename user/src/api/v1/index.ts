import express, { Router } from "express";
import health from "./health";
import packagerouter from "./Packages/package.routes";
import userRouter from "./Users/Users.routes";
import kycrouter from "./KYC/Kyc.routes";
import planPurchaseRouter from "./PlanPurchase/PlanPurchase.routes";
import systemIncomeRouter from "./systemincome/systemincome.route";
import walletRouter from "./wallet/wallet.routes";
import setupRouter from "./setup/setup.routes";

const v1: Router = express.Router();

v1.use("/health", health);

v1.use("/package", packagerouter);

v1.use("/users", userRouter);

v1.use("/kyc", kycrouter);

v1.use("/planpurchase", planPurchaseRouter);

v1.use("/systemincome", systemIncomeRouter);

v1.use("/wallet", walletRouter);

v1.use("/setup", setupRouter);

export default v1;
