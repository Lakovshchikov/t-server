import { Event } from '@services/event/event';
import { NextFunction, Request, Response } from 'express';
import { IEvent, TEventData } from '@services/event/eventTypes';
import eventController from '@services/event/eventController';

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
            async (req: Request, res: Response) => {
                try {
                    const data: TEventData = req.body;
                    const response = await eventController.createEvent(data);
                    if (response.isSuccess) {
                        const event = response.data as Event;
                        res.json(event.serialize());
                    } else {
                        res.status(409).send(response.error);
                    }
                } catch (e) {
                    res.status(500).send(e.message);
                }
            }
        ]
    },
    // Изменение мероприятий
    {
        path: '/events/',
        method: 'put',
        handler: [
            checkUserType,
            checkOrgId,
            async (req: Request, res:Response) => {
                try {
                    const data: TEventData = req.body;
                    const response: gt.TResponse = await eventController.updateEvent(data);
                    if (response.isSuccess) {
                        const event = response.data as Event;
                        res.json(event.serialize());
                    } else {
                        res.status(409).send(response.error);
                    }
                } catch (e) {
                    res.status(500).send(e);
                }
            }
        ]
    }
];
