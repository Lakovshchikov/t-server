import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { TMemberData } from '@services/member/types';
import asyncHandler from 'express-async-handler';
import memberController from './controller';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (memberController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkPermission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const data: TMemberData[] = req.body;
    // @ts-ignore
    const hasPermission = await memberController.checkPermission(data[0].id_d, user.id);
    if (hasPermission) {
        next();
    } else {
        throw createHttpError(403, 'The user does not have permission to do this.');
    }
});

const getSerializedArray = (array: {serialize: () => Record<string, any>}[]): Record<string, any>[] => {
    const result: (Record<string, any>)[] = [];
    array.forEach((i) => {
        result.push(i.serialize());
    });
    return result;
};

export default [
    {
        path: '/events/member',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req:Request, res:Response) => {
                const data: TMemberData[] = req.body;
                const members = await memberController.createMembers(data);
                const result = getSerializedArray(members);
                res.json(result);
            })
        ]
    },
    {
        path: '/events/member',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req:Request, res:Response) => {
                const data: TMemberData[] = req.body;
                const members = await memberController.updateMember(data);
                const result = getSerializedArray(members);
                res.json(result);
            })
        ]
    },
    // param date_id
    {
        path: '/events/member',
        method: 'get',
        handler: [
            asyncHandler(async (req:Request, res:Response) => {
                const dateId: string = req.query.date_id as string;
                const members = await memberController.getMembersByDateId(dateId);
                const result = getSerializedArray(members);
                res.json(result);
            })
        ]
    }
];
