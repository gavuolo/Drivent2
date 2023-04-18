import { notFoundError } from "@/errors";
import { BodyTicket } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  return await ticketsRepository.allTicketType();
}

async function getTicketsByUser(userId: number) {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }
  const tickets = await ticketsRepository.findTicketsByEnrollment(enrollmentId.id);
  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
}

async function postTicket(ticketTypeId: number, userId: number) {
  const enrollmentId = await ticketsRepository.findEnrollmentByUserId(userId);
  if(!enrollmentId){
    throw notFoundError()
  }
  await ticketsRepository.createTicket(ticketTypeId, enrollmentId.id);
  const data = await ticketsRepository.findTicketsByEnrollment(enrollmentId.id)
  return data;
}

export default {
  getTicketsTypes,
  postTicket,
  getTicketsByUser,
};
