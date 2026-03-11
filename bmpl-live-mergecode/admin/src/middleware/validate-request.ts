import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        success: false,
        errors: error.details.map((e) => e.message),
      });
      return;
    }

    req.body = value;
    next();
  };
};
