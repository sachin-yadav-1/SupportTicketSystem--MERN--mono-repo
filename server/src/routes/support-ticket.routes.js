import { Router } from "express";
import {
  assignTicket,
  createTicket,
  getTicketByID,
  searchTickets,
  updateTicket,
} from "../controllers/support-ticket.controller.js";

const router = Router();

router.route("").post(createTicket).get(searchTickets).patch(updateTicket);
router.route("/:id").get(getTicketByID);
router.patch("/assign", assignTicket);

export default router;
