import { Router } from "express";
import {
  createAgent,
  searchAllAgents,
} from "../controllers/support-agent.controller.js";

const router = Router();

router.route("").post(createAgent).get(searchAllAgents);

export default router;
