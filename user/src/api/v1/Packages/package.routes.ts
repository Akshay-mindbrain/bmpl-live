import express from "express";
import * as packageController from "../../../controllers/Package.Controller";

const packagerouter = express.Router();

packagerouter.post("/", packageController.createPackageController);

packagerouter.get("/", packageController.getAllPackagesController);

packagerouter.get("/:id", packageController.getPackageByIdController);

packagerouter.put("/:id", packageController.updatePackageController);

packagerouter.delete("/:id", packageController.deletePackageController);

export default packagerouter;
