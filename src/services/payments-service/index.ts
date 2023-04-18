import { notFoundError, unauthorizedError } from "@/errors";
import { CardDataProtocols } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function findPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketsById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const payment = await paymentsRepository.findPaymentsByTicket(ticketId);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function postPaymentService(ticketId: number, cardData: CardDataProtocols, userId: number){
  const ticket = await ticketsRepository.findTicketsById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  const price = await paymentsRepository.findPriceByTicketType(ticket.ticketTypeId)
   const data = {
     ticketId,
     value: price,
     cardIssuer: cardData.issuer,
     cardLastDigits: cardData.number.toString().slice(-4)
   }
   //atualizar ticket
   await ticketsRepository.updateTicket(ticketId)
   const response = await paymentsRepository.createPayment(data)
   console.log(response)
   return response
}

export default {
  findPayments,
  postPaymentService,
};
