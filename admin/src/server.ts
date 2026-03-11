import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import v1 from "./api/v1";
import morganMiddleware from "./middleware/morgan-middleware";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorHandler from "./middleware/error-handler";
// import "./corn/corn";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morganMiddleware)
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
      cors({
        origin: [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://localhost:5175",
        ],
        credentials: true,
      }),
    );

  app.use(cookieParser());
  app.use(helmet());

  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true, environment: config.env });
  });

  app.use("/v1", v1);
  app.use(errorHandler);

  return app;
};
