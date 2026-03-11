import express from "express";
import * as kycController from "../../../controllers/Kyc.Controller";
import validateRequest from "@/middleware/validate-request";
import { kycCreateSchema, kycUpdateSchema } from "@/data/request-schemas";
import { verifyUser } from "@/middleware/verifyToken";
import { getUploadSignature } from "@/controllers/cloudinary/cloudinary.Controller";

const kycrouter = express.Router();

kycrouter.use(verifyUser);
kycrouter.get("/cloudinary/signature", getUploadSignature);
kycrouter.post(
  "/",
  validateRequest(kycCreateSchema),
  kycController.createKycController,
);
kycrouter.get("/", kycController.getAllKycController);

kycrouter.get("/user/:userId", kycController.getKycByUserIdController);
kycrouter.get("/:id", kycController.getKycByIdController);

kycrouter.put(
  "/:id",
  validateRequest(kycUpdateSchema),
  kycController.updateKycController,
);

kycrouter.delete("/:id", kycController.deleteKycController);

export default kycrouter;
