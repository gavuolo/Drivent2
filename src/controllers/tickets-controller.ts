import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import { BodyTicket } from "@/protocols";

async function getAllTicketType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketsTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function postTicket(req: AuthenticatedRequest, res: Response) {
  const body = req.body as BodyTicket;
  const { userId } = req;
  try {
    await ticketsService.postTicket(body, userId);
    res.send(body);
  } catch (error) {
    console.log(error);
    res.send("catch");
  }
}

export default {
  getAllTicketType,
  postTicket,
};
