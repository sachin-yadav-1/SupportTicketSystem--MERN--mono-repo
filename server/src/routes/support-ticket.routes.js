import { Router } from "express";
import {
  createTicket,
  searchTickets,
  assignTicket,
} from "../controllers/support-ticket.controller.js";

const router = Router();

router.route("").post(createTicket).get(searchTickets);
router.patch("/assign", assignTicket);

export default router;
