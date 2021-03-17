import { NextFunction, Request, Response } from 'express';
import { TEventData } from '@services/event/types';
import eventController from '@services/event/controller';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (eventController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkOrgId = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const data: TEventData = req.body;

    if (data.id_org !== user.id) {
        next(createHttpError(403, 'The user does not have permission to do this.'));
    } else {
        next();
    }
};

export default [
    // Создание мероприятия
    {
        path: '/event/',
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
        path: '/event/',
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
