import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

async function getTickets(req: AuthenticatedRequest, res: Response){
    try{
        const ticketTypes = await ticketsService.getTicketsTypes();
        return res.status(httpStatus.OK).send(ticketTypes)
    }catch(error){
        console.log(error)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export default{
    getTickets,
}