import { notFoundError, unauthorizedError } from "@/errors";
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
  console.log("ooooooooo", payment);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function createPayment(){

}

export default {
  findPayments,
};
