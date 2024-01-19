import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: ".env.local" });
const app = express();

export default app;
