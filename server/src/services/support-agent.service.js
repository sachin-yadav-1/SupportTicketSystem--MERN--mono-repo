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
      new AppError("duplicate email or phone.", 409, "CONFLICT_EXCEPTION")
    );
  }

  data.name = data.name
    .split(" ")
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(" ");

  const agent = await SupportAgentModel.create(data);
  return agent;
});

export const searchAgents = catchAsync(async (data, next) => {
  const { page, limit, sort, ...rest } = data;

  const filter = { ...rest };
  sort = JSON.parse(sort);

  page = +page || 1;
  limit = +limit || 10;
  const skip = (page - 1) * limit;

  if (filter.name) {
    filter.name = { $regex: ".*" + filter.name + ".*", $options: "i" };
  }
  if (filter.email) {
    filter.email = { $regex: ".*" + filter.email + ".*", $options: "i" };
  }

  const query = [{ $match: filter }];
  if (sort && Object.keys(sort).length) query.push({ $sort: sort });
  query.push({
    $facet: {
      metadata: [
        { $count: "total" },
        {
          $addFields: {
            page,
            limit,
            pages: { $ceil: { $divide: ["$total", limit] } },
          },
        },
      ],
      data: [{ $skip: skip }, { $limit: limit }],
    },
  });

  const res = await SupportAgentModel.aggregate(query);
  return res;
});

export const getNextAgent = catchAsync(async (next) => {
  let agent = null;

  const lastAssigned = await SupportAgentModel.findOne({ _lastAssigned: true });
  if (lastAssigned) {
    agent = await SupportAgentModel.findOne({ _id: { $gt: lastAssigned._id } });
  }

  if (!lastAssigned || !agent) {
    agent = await SupportAgentModel.findOne({});
  }

  if (!agent) {
    return next(
      new AppError(
        "no agent available, create a new agent!",
        406,
        "NOT_ACCEPTABLE_EXCEPTION"
      )
    );
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
