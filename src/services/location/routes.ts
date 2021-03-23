import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { TLocationData } from '@services/location/types';
import { getSerializedArray } from 'routes_utils/dist';
import locController from './locController';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (locController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkPermission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const idD: string = req.query.id_d as string;
    let hasPermission: boolean = false;

    switch (req.method) {
        case 'POST': {
            // Автоматическая привязка, при создании места проведения привязывать его к дате мероприятия
            // по id_d заполнять id_sh и/или id_loc у date
            /// / Для sheme
            // Автоматическая привязка, при создании схемы проведения привязывать его
            // к дате и месту проведения мероприятия
            // по id_d и is_loc аналогично с местом
            hasPermission = await locController.checkPermission(idD, user.id); // ????
            break;
        }
        case 'PUT':
        case 'DELETE': {
            const idSh = req.body[0].id_sh;
            const { id } = req.body[0];
            if (id === undefined || idSh === undefined) {
                throw createHttpError(400, 'The request must contain two params: id and is_sh');
            }
            hasPermission = await locController.checkPermission(idD, user.id, id, idSh);
            break;
        }
        default: {
            break;
        }
    }

    if (hasPermission) {
        next();
    } else {
        throw createHttpError(403, 'The user does not have permission to do this.');
    }
});

export default [
    {
        path: '/event/location/',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TLocationData[] = req.body;
                const locations = await locController.createLocations(data);
                const result = getSerializedArray(locations);
                res.json(result);
            })
        ]
    },
    // param id_d - для проверки доступа
    {
        path: '/event/location/',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TLocationData[] = req.body;
                const locations = await locController.updateLocations(data);
                const result = getSerializedArray(locations);
                res.json(result);
            })
        ]
    },
    // params: id, id_sh
    {
        path: '/event/location/',
        method: 'get',
        handler: [
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const id: string = req.query.id as string;
                const idSh: string = req.query.id_sh as string;
                if (id === undefined || idSh === undefined) {
                    throw createHttpError(400, 'The request must contain id location and id scheme');
                }
                const location = await locController.getLocationById(id, idSh);
                res.json(location.serialize());
            })
        ]
    },
    // param id_d - для проверки доступа
    // TO DO проверка на то, что локация не участвует в мероприятиях
    {
        path: '/event/location/',
        method: 'delete',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const id: string = req.query.id as string;
                const idSh: string = req.query.id_sh as string;
                const result = await locController.deleteLocation(id, idSh);
                res.json(result);
            })
        ]
    }
];
