import Joi from "joi";

export const CreateSupportTicketValidator = Joi.object({
  assignedTo: Joi.string(),
  topic: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().uppercase().valid("NEW", "ASSIGNED", "RESOLVED"),
  severity: Joi.string().uppercase().valid("MINOR", "MODERATE", "CRITICAL"),
  type: Joi.string()
    .uppercase()
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
  sort: Joi.string(),
  assignedTo: Joi.string(),
  status: Joi.string().uppercase().valid("NEW", "ASSIGNED", "RESOLVED"),
  severity: Joi.string().uppercase().valid("MINOR", "MODERATE", "CRITICAL"),
  type: Joi.string()
    .uppercase()
    .valid(
      "TECH",
      "PRODUCT_INQUIRY",
      "PAYMENTS_AND_BILLING",
      "COMPLAINTS_AND_FEEDBACK"
    ),
});

export const AssignSupportTicketValidator = Joi.object({
  id: Joi.string().required(),
});

export const GetOneSupportTicketValidator = Joi.object({
  id: Joi.string().required(),
});

export const UpdateSupportTicketValidator = Joi.object({
  id: Joi.string().required(),
  topic: Joi.string(),
  description: Joi.string(),
  status: Joi.string().uppercase().valid("RESOLVED"),
  severity: Joi.string().uppercase().valid("MINOR", "MODERATE", "CRITICAL"),
  type: Joi.string()
    .uppercase()
    .valid(
      "TECH",
      "PRODUCT_INQUIRY",
      "PAYMENTS_AND_BILLING",
      "COMPLAINTS_AND_FEEDBACK"
    ),
});
