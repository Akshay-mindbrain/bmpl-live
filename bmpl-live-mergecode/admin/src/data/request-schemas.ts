import Joi from "joi";
export const adminRegisterSchema = Joi.object({
  firstName: Joi.string().min(2).required(),

  lastName: Joi.string().min(2).required(),

  email: Joi.string().email().required(),

  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile must be 10 digits",
    }),

  password: Joi.string().min(6).required(),
});

export const adminLoginSchema = Joi.object({
  username: Joi.string().min(2).required(),
  password: Joi.string().min(6).required(),
});

export const createPlanValidation = Joi.object({
  planName: Joi.string().min(2).max(50).required(),

  Description: Joi.string().min(3).max(255).required(),

  BV: Joi.number().positive().required(),

  price: Joi.number().positive().required(),

  dp_amount: Joi.number().positive().required(),

  status: Joi.string().valid("ACTIVE", "INACTIVE").optional(),

  features: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
      }),
    )
    .min(1)
    .required(),
});
