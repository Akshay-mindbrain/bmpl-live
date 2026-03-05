import express from "express";
import validateRequest from "@/middleware/validate-request";
import { verifyUser } from "@/middleware/verifyToken";
import { getUserIncomeController } from "@/controllers/systemIncome/systemincome.controller";
import { systemIncomeQuerySchema } from "@/data/request-schemas";

const systemIncomeRouter = express.Router();

systemIncomeRouter.use(verifyUser);

systemIncomeRouter.get(
  "/getincome",
  validateRequest(systemIncomeQuerySchema),
  getUserIncomeController,
);

export default systemIncomeRouter;
