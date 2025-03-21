import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { utilRouter } from "@/api/util/utilRouter";
import { restRouter } from "@/api/rest/restRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import cookieParser from "cookie-parser";


const logger = pino({ name: "server start" });
const app: Express = express();

// Set up database

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());

// Request logging
app.use(requestLogger);

// Routes
app.use("/util", utilRouter);
app.use("/api", restRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
