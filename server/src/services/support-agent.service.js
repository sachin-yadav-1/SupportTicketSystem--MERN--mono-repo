import SupportAgentModel from "../models/support-agent.model.js";
import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";

export const createNewAgent = catchAsync(async (data, next) => {
  let { email, phone } = data;

  const agentExists = await SupportAgentModel.findOne({
    $or: [{ email }, { phone }],
  });
  if (agentExists) {
    return next(
      new AppError("duplicate email or phone.", 409, "NOT_ACCEPTABLE_EXCEPTION")
    );
  }

  data.name = data.name
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");

  const agent = await SupportAgentModel.create(data);
  return agent;
});

export const getNextAgent = catchAsync(async () => {
  let agent = null;

  const lastAssigned = await SupportAgentModel.findOne({ _lastAssigned: true });
  if (lastAssigned) {
    agent = await SupportAgentModel.findOne({ _id: { $gt: lastAssigned._id } });
  }

  if (!lastAssigned || !agent) {
    agent = await SupportAgentModel.findOne({});
  }

  if (!agent) {
    return next(new AppError("no agent available, create a new agent!", 404));
  }

  return {
    prevAgentID: lastAssigned?._id || null,
    nextAgentID: agent?._id || null,
  };
});

export const updateAssignedAgent = catchAsync(async (data, next) => {
  const { prevAgentID, nextAgentID } = data;

  if (prevAgentID) {
    await SupportAgentModel.findByIdAndUpdate(prevAgentID, {
      _lastAssigned: false,
    });
  }

  if (nextAgentID) {
    await SupportAgentModel.findByIdAndUpdate(nextAgentID, {
      _lastAssigned: true,
    });
  }

  return;
});
