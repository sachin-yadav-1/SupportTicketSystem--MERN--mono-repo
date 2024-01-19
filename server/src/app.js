import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./controllers/error.controller.js";
import agentRouter from "./routes/support-agent.routes.js";
import AppError from "./utils/app-error.js";

dotenv.config({ path: ".env.local" });
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "100kb" }));

app.use("/api/support-agents", agentRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `path not found: ${req.originalUrl}`,
      404,
      "NOT_FOUND_EXCEPTION"
    )
  );
});

app.use(globalErrorHandler);

export default app;
