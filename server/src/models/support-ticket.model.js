import { Schema, SchemaTypes, model } from "mongoose";

const SupportTicketSchema = new Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    type: {
      type: String,
      enum: [
        "TECH",
        "PRODUCT_INQUIRY",
        "PAYMENTS_AND_BILLING",
        "COMPLAINTS_AND_FEEDBACK",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["NEW", "ASSIGNED", "RESOLVED"],
      default: "NEW",
    },
    resolvedOn: { type: Date, default: null },
    severity: {
      type: String,
      enum: ["MINOR", "MODERATE", "CRITICAL"],
      default: "MINOR",
    },
    assignedTo: {
      type: SchemaTypes.ObjectId,
      ref: "SupportAgent",
      default: null,
    },
  },
  { versionKey: false }
);

const SupportTicketModel = model("SupportTicket", SupportTicketSchema);

export default SupportTicketModel;
