import { prisma } from "@/config";
import { BodyTicket } from "@/protocols";

async function allTicketType() {
  return prisma.ticketType.findMany();
}
async function createTicket(body: BodyTicket, userId: number) {
  const { ticketTypeId } = body;
  const enrollmentId = await prisma.enrollment.findUnique({
    where: { userId },
  });
  console.log(enrollmentId.id)
   await prisma.ticket.create({
     data: {
       ticketTypeId,
       status: "RESERVED",
       enrollmentId: enrollmentId.id,
     },
   });
  console.log(body);
}
export default {
  allTicketType,
  createTicket,
};
