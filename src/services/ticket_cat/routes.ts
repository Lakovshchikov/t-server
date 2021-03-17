import { NextFunction, Request, Response } from 'express';
import { TTicketCatData } from '@services/ticket_cat/types';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { getSerializedArray } from 'routes_utils/dist';
import ticketCatController from './controller';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (ticketCatController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkPermission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const idD: string = req.query.id_d as string;
    let idDate: string;
    if (idD && idD !== '') {
        idDate = idD;
    } else {
        const data: TTicketCatData[] = req.body;
        idDate = data[0].id_d;
    }
    // @ts-ignore
    const hasPermission = await ticketCatController.checkPermission(idDate, user.id);
    if (hasPermission) {
        next();
    } else {
        throw createHttpError(403, 'The user does not have permission to do this.');
    }
});

export default [
    {
        path: '/event/ticket_cat/',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TTicketCatData[] = req.body;
                const ticketCats = await ticketCatController.createTicketCat(data);
                const result = getSerializedArray(ticketCats);
                res.json(result);
            })
        ]
    },
    {
        path: '/event/ticket_cat/',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TTicketCatData[] = req.body;
                const ticketCats = await ticketCatController.updateTicketCat(data);
                const result = getSerializedArray(ticketCats);
                res.json(result);
            })
        ]
    },
    // param date_id
    {
        path: '/event/ticket_cat/',
        method: 'get',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const dateId: string = req.query.date_id as string;
                const ticketCats = await ticketCatController.getTicketCatsByDateId(dateId);
                const result = getSerializedArray(ticketCats);
                res.json(result);
            })
        ]
    },
    // params: id, id_d
    {
        path: '/event/ticket_cat/',
        method: 'delete',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const id: string = req.query.id as string;
                const success = await ticketCatController.deleteTicketCat(id);
                res.send(success);
            })
        ]
    }
];
