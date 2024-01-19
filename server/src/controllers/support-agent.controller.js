import { createNewAgent } from "../services/support-agent.service.js";
import catchAsync from "../utils/catch-async.js";
import SupportAgentValidator from "../validators/support-agent.validator.js";

export const createAgent = catchAsync(async (req, res, next) => {
  const data = req.body;
  await SupportAgentValidator.validateAsync(data);

  const agent = await createNewAgent(data, next);
  if (agent) {
    res.status(201).json({
      success: true,
      data: agent,
    });
  }

  return;
});
