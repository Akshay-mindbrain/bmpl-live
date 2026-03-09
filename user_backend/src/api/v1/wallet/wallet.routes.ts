import express from "express";
import { verifyUser } from "@/middleware/verifyToken";
import { getWalletController } from "@/controllers/wallet/wallet.controller";

const walletRouter = express.Router();

walletRouter.use(verifyUser);
walletRouter.get("/get", getWalletController);

export default walletRouter;
