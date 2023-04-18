import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router()

ticketsRouter.all('/*', authenticateToken)
ticketsRouter.get('/types', ticketsController.getAllTicketType)
ticketsRouter.post('/', ticketsController.postTicket)
ticketsRouter.get('/tickets', ticketsController.getTickets)

export  {ticketsRouter}