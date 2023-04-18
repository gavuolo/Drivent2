import { notFoundError } from "@/errors";
import { BodyTicket } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  return await ticketsRepository.allTicketType();
}

async function getTicketsByUser(userId: number) {
  const tickets = await ticketsRepository.findTicketsByUser(userId);
  // if(!tickets){
  //   throw notFoundError();
  // }
  return tickets
}

async function postTicket(ticketTypeId: number, userId: number) {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  const data = await ticketsRepository.createTicket(
    ticketTypeId,
    enrollmentId
  );
  return data;
}

export default {
  getTicketsTypes,
  postTicket,
  getTicketsByUser,
};
