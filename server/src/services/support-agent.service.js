import AgentModel from "../models/support-agent.model.js";
import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";

export const createNewAgent = catchAsync(async (data, next) => {
  let { email, phone } = data;

  const agentExists = await AgentModel.findOne({ $or: [{ email }, { phone }] });
  if (agentExists) {
    return next(
      new AppError("duplicate email or phone.", 409, "NOT_ACCEPTABLE_EXCEPTION")
    );
  }

  data.name = data.name
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");

  const agent = await AgentModel.create(data);
  return agent;
});
