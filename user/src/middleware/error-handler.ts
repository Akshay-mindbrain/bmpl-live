import { ErrorRequestHandler } from "express";
import config from "../config";
import { getErrorMessage } from "../utils";
import CustomError from "../errors/CustomError";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import Joi from "joi";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (Joi.isError(error)) {
    res.status(422).json({
      success: false,
      error: {
        message: "Validation error",
        code: "ERR_VALID",
        details: error.details.map((item) => ({ message: item.message })),
      },
    });
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
      },
    });
    return;
  }

  if (error instanceof UnauthorizedError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: "code" in error ? error.code : "ERR_AUTH",
      },
    });
    return;
  }

  const message =
    getErrorMessage(error) ||
    "An error occurred. Please view logs for more details";

  const response = {
    success: false,
    error: {
      message,
      code: "ERR_INTERNAL",
      ...(config.debug && error instanceof Error ? { stack: error.stack } : {}),
    },
  };

  res.status(500).json(response);
};

export default errorHandler;
