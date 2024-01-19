import Joi from "joi";

const SupportAgentValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().length(12).required(),
  active: Joi.boolean(),
  description: Joi.string().required(),
});

export default SupportAgentValidator;
