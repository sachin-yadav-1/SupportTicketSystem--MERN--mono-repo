import {
  createNewAgent,
  searchAgents,
} from "../services/support-agent.service.js";
import catchAsync from "../utils/catch-async.js";
import {
  CreateSupportAgentValidator,
  SearchSupportAgentsValidator,
} from "../validators/support-agent.validator.js";

export const createAgent = catchAsync(async (req, res, next) => {
  const data = req.body;
  await CreateSupportAgentValidator.validateAsync(data);

  const agent = await createNewAgent(data, next);
  if (agent) {
    res.status(201).json({
      success: true,
      data: agent,
    });
  }

  return;
});

export const searchAllAgents = catchAsync(async (req, res, next) => {
  const data = req.query;
  await SearchSupportAgentsValidator.validateAsync(data);

  const agent = await searchAgents(data, next);
  if (agent) {
    res.status(201).json({
      success: true,
      data: agent,
    });
  }

  return;
});
