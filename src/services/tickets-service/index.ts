import { BodyTicket } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  return await ticketsRepository.allTicketType();
}

async function postTicket(body: BodyTicket, userId: number) {
  return await ticketsRepository.createTicket(body, userId);
}

export default {
  getTicketsTypes,
  postTicket,
};
