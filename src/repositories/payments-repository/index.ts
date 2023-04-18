import { prisma } from "@/config";
import { CardDataProtocols, PaymentType } from "@/protocols";

async function findPaymentsByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
async function createPayment(data: PaymentType) {
  return prisma.payment.create({ data });
}
async function findPriceByTicketType(ticketTypeId: number) {
  const price = await prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
  return price.price;
}

export default {
  findPaymentsByTicket,
  createPayment,
  findPriceByTicketType,
};
