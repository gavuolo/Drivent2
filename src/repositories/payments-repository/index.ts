import { prisma } from "@/config";

async function findPaymentsByTicket(ticketId:number){
    return prisma.payment.findFirst({
        where: {
          ticketId,
        },
      });
}

export default{
    findPaymentsByTicket,
}