import { Types } from "mongoose";
import SupportTicketModel from "../models/support-ticket.model.js";
import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";
import { getNextAgent, updateAssignedAgent } from "./support-agent.service.js";

export const createNewTicket = catchAsync(async (data, next) => {
  const ticket = await SupportTicketModel.create(data);
  return await SupportTicketModel.findById(ticket._id).populate([
    { path: "assignedTo", select: { _id: 1, name: 1 } },
  ]);
});

export const searchAllTickets = async (data, next) => {
  let { page, limit, sort, ...rest } = data;
  const filter = { ...rest };
  sort = JSON.parse(sort);

  page = +page || 1;
  limit = +limit || 10;
  const skip = (page - 1) * limit;

  if (filter.assignedTo) {
    filter.assignedTo = new Types.ObjectId(filter.assignedTo);
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

  const res = await SupportTicketModel.aggregate(query);
  return res;
};

export const assignTicketByID = catchAsync(async (id, next) => {
  let ticket = await SupportTicketModel.findById(id);
  if (!ticket) {
    return next(new AppError("invalid ticket id.", 404, "NOT_FOUND_EXCEPTION"));
  }

  if (ticket.status === "ASSIGNED") {
    return next(
      new AppError(
        "ticket already assigned to an agent",
        406,
        "NOT_ACCEPTABLE_EXCEPTION"
      )
    );
  }

  const { prevAgentID, nextAgentID } = await getNextAgent();

  ticket = await SupportTicketModel.findByIdAndUpdate(
    id,
    {
      assignedTo: nextAgentID,
      status: "ASSIGNED",
    },
    { new: true }
  ).populate([{ path: "assignedTo", select: { _id: 1, name: 1 } }]);

  await updateAssignedAgent({ prevAgentID, nextAgentID });

  return ticket;
});

export const updateTicketByID = catchAsync(async (data, next) => {
  const { id, ...update } = data;

  if (update.status && update.status === "RESOLVED") {
    if (ticket.status === "RESOLVED") {
      return next(
        new AppError(
          "ticket already resolved.",
          406,
          "NOT_EXCEPTABLE_EXCEPTION"
        )
      );
    }
    update["resolvedOn"] = new Date();
  }

  ticket = await SupportTicketModel.findByIdAndUpdate(id, update, {
    new: true,
  }).populate([{ path: "assignedTo", select: { _id: 1, name: 1 } }]);

  if (!ticket) {
    return next(new AppError("invalid ticket ID.", 404, "NOT_FOUND_EXCEPTION"));
  }

  return ticket;
});

export const searchTicketByID = async (id, next) => {
  const ticket = await SupportTicketModel.findById(id).populate([
    { path: "assignedTo", select: { _id: 1, name: 1 } },
  ]);

  if (!ticket) {
    return next(new AppError("invalid ticket ID", 404, "NOT_FOUND_EXCEPTION"));
  }

  return ticket;
};
