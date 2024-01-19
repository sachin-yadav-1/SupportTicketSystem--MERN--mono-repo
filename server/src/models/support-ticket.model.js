import { Schema, SchemaTypes, model } from "mongoose";
import TicketSeverity from "../constants/ticketSeverity.enum.js";
import TicketStatus from "../constants/ticketStatus.enum.js";
import TicketType from "../constants/ticketType.enum.js";

const SupportTicketSchema = new Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    type: { type: String, enum: TicketType, required: true },
    status: { type: String, enum: TicketStatus, default: TicketStatus.NEW },
    resolvedOn: { type: Date, default: null },
    severity: {
      type: String,
      enum: TicketSeverity,
      default: TicketSeverity.MINOR,
    },
    assignedTo: {
      type: SchemaTypes.ObjectId,
      ref: "SupportAgent",
      default: null,
    },
  },
  { versionKey: false }
);

const SupportTicketModel = model("SupportAgent", SupportTicketSchema);

export default SupportTicketModel;
