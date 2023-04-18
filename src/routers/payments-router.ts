import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import paymentsController from '@/controllers/payments-controller';
const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken)
paymentsRouter.get('/', paymentsController.getPayment)
paymentsRouter.post('/process', paymentsController.postPayment)

export {paymentsRouter}