import { prisma } from "@/config";
import { BodyTicket } from "@/protocols";

async function allTicketType() {
  return prisma.ticketType.findMany();
}

async function findEnrollmentById(userId: number){
  const enrollmentId = await prisma.enrollment.findUnique({
    where: { userId },
  });
  return enrollmentId
}

async function createTicket(ticketTypeId: number, userId: number, enrollmentId: number) {
   const data = await prisma.ticket.create({
     data: {
       ticketTypeId,
       status: "RESERVED",
       enrollmentId,
     },
   });
   return data
}
export default {
  allTicketType,
  createTicket,
  findEnrollmentById,
};
