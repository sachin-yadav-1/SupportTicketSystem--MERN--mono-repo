import { Types } from "mongoose";
import SupportTicketModel from "../models/support-ticket.model.js";
import AppError from "../utils/app-error.js";
import catchAsync from "../utils/catch-async.js";
import { getNextAgent } from "./support-agent.service.js";

export const createNewTicket = catchAsync(async (data, next) => {
  const ticket = await SupportTicketModel.create(data);
  return ticket;
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

  const agentID = await getNextAgent();

  ticket = await SupportTicketModel.findByIdAndUpdate(id, {
    assignedTo: agentID,
    status: "ASSIGNED",
  });

  return ticket;
});
