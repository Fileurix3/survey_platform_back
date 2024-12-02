import { Response } from "express";
import cookieParser from "cookie-parser";
import mongo from "mongoose";
import redisClient from "./redis/redis.js";
import express from "express";
import authRouter from "./auth/auth_router.js";
import surveysRouter from "./surveys/surveys_router.js";
import "dotenv/config";

const app = express();

mongo
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connection to Mongo was successful"))
  .catch((err) => console.log(`Mongo error: ` + err));

redisClient
  .connect()
  .then(() => console.log("Connected to Redis was successful"))
  .catch((err) => console.log("Redis error: " + err));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/auth", authRouter);
app.use("/survey", surveysRouter);

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handlerError(err: unknown, res: Response): Response {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: (err as Error).message || "Unknown error",
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server was running on port: ${PORT}`));

export default app;
