import express from "express";
import validateRequest from "@/middleware/validate-request";
import { userSetupSchema } from "@/data/request-schemas";
import { initializeSetupController } from "@/controllers/setup.controller";

const setupRouter = express.Router();

setupRouter.post("/", validateRequest(userSetupSchema), initializeSetupController);

export default setupRouter;
