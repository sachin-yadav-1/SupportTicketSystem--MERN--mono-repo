import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const app = express();

export default app;
