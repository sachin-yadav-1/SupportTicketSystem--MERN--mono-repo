import Joi from "joi";

export const CreateSupportTicketValidator = Joi.object({
  assignedTo: Joi.string(),
  topic: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("NEW", "ASSIGNED", "RESOLVED"),
  severity: Joi.string().valid("MINOR", "MODERATE", "CRITICAL"),
  type: Joi.string()
    .valid(
      "TECH",
      "PRODUCT_INQUIRY",
      "PAYMENTS_AND_BILLING",
      "COMPLAINTS_AND_FEEDBACK"
    )
    .required(),
});

export const SearchSupportTicketValidator = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  assignedTo: Joi.string(),
  status: Joi.string().valid("NEW", "ASSIGNED", "RESOLVED"),
  severity: Joi.string().valid("MINOR", "MODERATE", "CRITICAL"),
  type: Joi.string().valid(
    "TECH",
    "PRODUCT_INQUIRY",
    "PAYMENTS_AND_BILLING",
    "COMPLAINTS_AND_FEEDBACK"
  ),
});

export const AssignSupportTicketValidator = Joi.object({
  id: Joi.string().required(),
});
