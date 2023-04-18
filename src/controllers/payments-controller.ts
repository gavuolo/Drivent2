import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";

async function getPayment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);
  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const payment = await paymentsService.findPayments(ticketId, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

async function postPayment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;
  if (!ticketId || !cardData ) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const paymentData = await paymentsService.postPaymentService(ticketId, cardData, userId)

    return res.status(httpStatus.OK).send(paymentData)

  } catch (error) {
    next(error);
  }
}

export default {
  getPayment,
  postPayment,
};
