import Joi from "joi";

export const CreateSupportAgentValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().length(10).required(),
  active: Joi.boolean(),
  description: Joi.string().required(),
});

export const SearchSupportAgentsValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().length(10),
  active: Joi.boolean(),
});
