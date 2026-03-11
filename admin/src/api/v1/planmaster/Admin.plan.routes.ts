import { validate } from "./../../../middleware/validate-request";
import {
  createPlancontroller,
  deleteplancontroller,
  getPlanbyidcontrooler,
  getplancontroller,
  updatePlancontroller,
} from "@/controllers/Admin.planmaster.controller";
import { createPlanValidation } from "@/data/request-schemas";

import { verifyAdmin } from "@/middleware/verifyToken";

import express from "express";

export const adminplanRouter = express.Router();
adminplanRouter.post(
  "/createplan",
  verifyAdmin,
  validate(createPlanValidation),
  createPlancontroller,
);
adminplanRouter.get("/getplan", verifyAdmin, getplancontroller);
adminplanRouter.get("/getplan/:id", verifyAdmin, getPlanbyidcontrooler);
adminplanRouter.put("/updateplan/:id", verifyAdmin, updatePlancontroller);
adminplanRouter.delete("/deleteplan/:id", verifyAdmin, deleteplancontroller);
