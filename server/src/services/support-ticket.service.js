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

  page = +page || 1;
  limit = +limit || 10;
  const skip = (page - 1) * limit;

  if (filter.assignedTo) filter.assignedTo = Types.ObjectId(filter.assignedTo);

  const res = await SupportTicketModel.aggregate([
    { $match: filter },
    // ...(sort && Object.keys(sort).length && { $sort: sort }),
    {
      $facet: {
        metadata: [{ $count: "total" }, { $addFields: { page } }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ]);

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
        409,
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
