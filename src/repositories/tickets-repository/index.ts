import { prisma } from "@/config";
import { BodyTicket } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function allTicketType() {
  return prisma.ticketType.findMany();
}

async function findTicketsByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketsById(ticketId: number){
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findEnrollmentByUserId(userId: number) {
  const enrollmentId = await prisma.enrollment.findFirst({
    where: { userId },
  });
  return enrollmentId;
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

async function updateTicket(ticketId: number){
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}
export default {
  allTicketType,
  createTicket,
  findEnrollmentByUserId,
  findTicketsByEnrollment,
  findTicketsById,
  updateTicket
};
