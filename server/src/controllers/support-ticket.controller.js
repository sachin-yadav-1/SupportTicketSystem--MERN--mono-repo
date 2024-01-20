import {
  assignTicketByID,
  createNewTicket,
  searchAllTickets,
  updateTicketByID,
  searchTicketByID,
} from "../services/support-ticket.service.js";
import catchAsync from "../utils/catch-async.js";
import {
  AssignSupportTicketValidator,
  CreateSupportTicketValidator,
  SearchSupportTicketValidator,
  UpdateSupportTicketValidator,
  GetOneSupportTicketValidator,
} from "../validators/support-ticket.validator.js";

export const createTicket = catchAsync(async (req, res, next) => {
  const data = req.body;
  await CreateSupportTicketValidator.validateAsync(data);

  const ticket = await createNewTicket(data, next);
  if (ticket) {
    res.status(201).json({
      success: true,
      data: ticket,
    });
  }

  return;
});

export const searchTickets = catchAsync(async (req, res, next) => {
  const data = req.query;
  await SearchSupportTicketValidator.validateAsync(data);

  const ticket = await searchAllTickets(data, next);
  if (ticket) {
    res.status(201).json({
      success: true,
      data: ticket,
    });
  }

  return;
});

export const assignTicket = catchAsync(async (req, res, next) => {
  const data = req.body;
  await AssignSupportTicketValidator.validateAsync(data);

  const ticket = await assignTicketByID(data.id, next);
  if (ticket) {
    res.status(201).json({
      success: true,
      data: ticket,
    });
  }

  return;
});

export const updateTicket = catchAsync(async (req, res, next) => {
  const data = req.body;
  await UpdateSupportTicketValidator.validateAsync(data);

  const ticket = await searchTicketByID(data, next);
  if (ticket) {
    res.status(201).json({
      success: true,
      data: ticket,
    });
  }

  return;
});

export const getTicketByID = catchAsync(async (req, res, next) => {
  const data = req.query;
  await GetOneSupportTicketValidator.validateAsync(data);

  const ticket = await updateTicketByID(data, next);
  if (ticket) {
    res.status(201).json({
      success: true,
      data: ticket,
    });
  }

  return;
});
