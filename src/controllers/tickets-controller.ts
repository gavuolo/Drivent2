import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { BodyTicket } from "@/protocols";

async function getAllTicketType(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const ticketTypes = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getTickets(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.getTicketsByUser(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    next(error);
  }
}

async function postTicket(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { ticketTypeId } = req.body as BodyTicket;
  const { userId } = req;
  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {

    const data = await ticketsService.postTicket(ticketTypeId, userId);
    
    return res.status(httpStatus.CREATED).send(data);

  } catch (error) {
    next(error);
  }
}

export default {
  getAllTicketType,
  postTicket,
  getTickets,
};
