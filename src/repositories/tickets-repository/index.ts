import { prisma } from "@/config";
import { BodyTicket } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function allTicketType() {
  return prisma.ticketType.findMany();
}

async function findTicketsByUser(userId: number) {
 
}

async function findEnrollmentByUserId(userId: number) {
  const enrollmentId = await prisma.enrollment.findFirst({
    where: { userId },
  });
  return enrollmentId.id;
}

async function createTicket(
  ticketTypeId: number,
  enrollmentId: number
) {
  const data = await prisma.ticket.create({
    data: {
      ticketTypeId,
      status: TicketStatus.RESERVED,
      enrollmentId,
    },
  });
  return data;
}
export default {
  allTicketType,
  createTicket,
  findEnrollmentByUserId,
  findTicketsByUser,
};
