import { prisma } from '@/config';

async function allTicketType(){
    return prisma.ticketType.findMany()
}

export default {
    allTicketType,
}