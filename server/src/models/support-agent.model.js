import { Schema, model } from "mongoose";

const SupportAgentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    _lastAssigned: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const SupportAgentModel = model("SupportAgent", SupportAgentSchema);

export default SupportAgentModel;
