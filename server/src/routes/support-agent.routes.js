import { Router } from "express";
import { createAgent } from "../controllers/support-agent.controller.js";

const router = Router();

router.post("", createAgent);

export default router;
