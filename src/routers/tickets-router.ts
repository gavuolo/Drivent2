import { Router } from 'express';
import ticketsController from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router()

ticketsRouter.all('/*', authenticateToken)
ticketsRouter.get('/types', ticketsController.getTickets)

export  {ticketsRouter}