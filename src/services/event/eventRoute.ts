import { NextFunction, Request, Response } from 'express';
import { TEventData } from '@services/event/eventTypes';
import eventController from '@services/event/eventController';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (eventController.checkUser(user)) {
        next();
    } else {
        res.redirect(401, '/org/login');
    }
};

const checkOrgId = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const data: TEventData = req.body;
    // @ts-ignore
    if (data.id_org !== user.id) {
        res.status(409).send('Wrong organization id');
    } else {
        next();
    }
};

export default [
    // Создание мероприятия
    {
        path: '/events/',
        method: 'post',
        handler: [
            checkUserType,
            checkOrgId,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TEventData = req.body;
                const event = await eventController.createEvent(data);
                if (event) {
                    res.json(event.serialize());
                } else {
                    throw createHttpError(400, 'Create event error');
                }
            })
        ]
    },
    // Изменение мероприятий
    {
        path: '/events/',
        method: 'put',
        handler: [
            checkUserType,
            checkOrgId,
            asyncHandler(async (req: Request, res:Response) => {
                const data: TEventData = req.body;
                const event = await eventController.updateEvent(data);
                if (event) {
                    res.json(event.serialize());
                } else {
                    throw createHttpError(400, 'Create event error');
                }
            })
        ]
    }
];
