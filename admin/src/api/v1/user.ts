// import express from "express";
// import * as userController from "../../controllers/UserController";
// import authenticateUser from "../../middleware/authenticate-user";
// import validateRequest from "../../middleware/validate-request";
// import Joi from "joi";

// const router = express.Router();

// const userSchema = Joi.object({
//   firstName: Joi.string().max(50),
//   lastName: Joi.string().max(50),
//   email: Joi.string().email().required(),
//   mobile: Joi.string().max(20),
//   username: Joi.string().min(3).max(30).required(),
//   password: Joi.string().min(6).required(),
// });

// const updateSchema = Joi.object({
//   firstName: Joi.string().max(50),
//   lastName: Joi.string().max(50),
//   email: Joi.string().email(),
//   mobile: Joi.string().max(20),
//   username: Joi.string().min(3).max(30),
//   password: Joi.string().min(6),
// });

// router.use(authenticateUser);

// router.post("/", validateRequest(userSchema), userController.create);
// router.get("/", userController.getAll);
// router.get("/:id", userController.getOne);
// router.put("/:id", validateRequest(updateSchema), userController.update);
// router.delete("/:id", userController.deleteUser);

// export default router;
