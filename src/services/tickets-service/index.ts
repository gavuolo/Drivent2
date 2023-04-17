import { notFoundError } from "@/errors";
import { BodyTicket } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  return await ticketsRepository.allTicketType();
}

async function postTicket(ticketTypeId: number, userId: number) {
  const enrollmentId = await ticketsRepository.findEnrollmentById(userId);
  if (!enrollmentId) {
    throw notFoundError()
  }
  const data = await ticketsRepository.createTicket(
    ticketTypeId,
    userId,
    enrollmentId.id
  );
  console.log(data)
  return data;
}

export default {
  getTicketsTypes,
  postTicket,
};
