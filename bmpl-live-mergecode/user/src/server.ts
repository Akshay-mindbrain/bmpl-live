import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
// import v1 from "./routes/v1";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler";
import morganMiddleware from "./middleware/morgan-middleware";
import v1 from "./api/v1";
import helmet from "helmet"; //this line is added by rahul [as instructed ]
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
  statusCode: 429,
  keyGenerator: (req) => ipKeyGenerator(req.ip ?? "0.0.0.0"),
  skip: (req) => req.method === "OPTIONS",
});

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morganMiddleware)
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
      cors({
        origin: "http://localhost:5173",
        credentials: true, // if you are using cookies / auth headers
      }),
    )
    .use(helmet())
    .use(limiter)
    .use(cookieParser());

  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env });
  });

  app.use("/v1", v1);

  app.use(errorHandler);

  return app;
};
