import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
    return await ticketsRepository.allTicketType()
}

export default{
    getTicketsTypes,
}