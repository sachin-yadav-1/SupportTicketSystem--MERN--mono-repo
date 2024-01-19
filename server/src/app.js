import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import globalErrorHandler from "./controllers/error.controller.js";
import supportAgentRouter from "./routes/support-agent.routes.js";
import supportTicketRouter from "./routes/support-ticket.routes.js";
import AppError from "./utils/app-error.js";

dotenv.config({ path: ".env.local" });
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "100kb" }));

app.use("/api/support-agents", supportAgentRouter);
app.use("/api/support-tickets", supportTicketRouter);

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
