import {
  generateincomeController,
  IncomegenController,
  incomeHistoryController,
} from "@/controllers/incomeGenerate.controller";
import express from "express";

export const incomeRouter = express.Router();
incomeRouter.post("/generate", IncomegenController);
incomeRouter.get("/gettotalincome", generateincomeController);
incomeRouter.get("/history", incomeHistoryController);
