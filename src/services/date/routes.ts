import { NextFunction, Request, Response } from 'express';
import eventController from '@services/event/controller';
import dateController from '@services/date/controller';
import { TDateData } from '@services/date/types';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (eventController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkPermission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const data: TDateData = req.body;
    // @ts-ignore
    const hasPermission = await dateController.checkPermission(data.id_ev, user.id);
    if (hasPermission) {
        next();
    } else throw createHttpError(403, 'The user does not have permission to do this.');
});

export default [
    // Создание даты проведения мероприятия
    {
        path: '/event/date/',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TDateData = req.body;
                const date = await dateController.createDate(data);
                res.json(date.serialize());
            })
        ]
    },
    // Изменение даты проведения мероприятия
    {
        path: '/event/date/',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TDateData = req.body;
                const date = await dateController.updateDate(data);
                res.json(date.serialize());
            })
        ]
    }
];
