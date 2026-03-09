import authenticateUser from "@/middleware/authenticate-user";
import validateRequest from "@/middleware/validate-request";
import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleteUser,
  getDownline,
  getUpline,
  getLastNodeByLegController,
} from "../../../controllers/Users.controller";

import {
  loginController,
  RegenAccessToken,
  logoutController,
} from "../../../controllers/auth/auth.controller";

import {
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
} from "@/data/request-schemas";
import { verifyUser } from "@/middleware/verifyToken";

const userRouter = express.Router();
// userRouter.use(authenticateUser);

// console.log("Api is being hit in routes");
userRouter.post("/", validateRequest(userCreateSchema), create);
userRouter.post("/login", validateRequest(userLoginSchema), loginController);
userRouter.post("/regen-token", RegenAccessToken);

userRouter.get("/", getAll);

userRouter.use(verifyUser);

userRouter.post("/logout", logoutController);

userRouter.get("/profile", getOne);
userRouter.get("/downline", getDownline);
userRouter.get("/upline", getUpline);
userRouter.put("/last-node-update", getLastNodeByLegController);
userRouter.put("/", validateRequest(userUpdateSchema), update);
userRouter.delete("/", deleteUser);
export default userRouter;
