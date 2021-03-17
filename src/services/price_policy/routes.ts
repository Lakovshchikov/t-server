import { NextFunction, Request, Response } from 'express';
import { TPricePolicyData } from '@services/price_policy/types';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { getSerializedArray } from 'routes_utils/dist';
import ppController from './controller';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (ppController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

const checkPermission = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const id: string = req.query.id_cat as string;
    let iD: string;
    if (id && id !== '') {
        iD = id;
    } else {
        const data: TPricePolicyData[] = req.body;
        iD = data[0].id_cat;
    }
    // @ts-ignore
    const hasPermission = await ppController.checkPermission(iD, user.id);
    if (hasPermission) {
        next();
    } else {
        throw createHttpError(403, 'The user does not have permission to do this.');
    }
});

export default [
    {
        path: '/event/price_policy/',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TPricePolicyData[] = req.body;
                const pricePolices = await ppController.createPricePolices(data);
                const result = getSerializedArray(pricePolices);
                res.json(result);
            })
        ]
    },
    {
        path: '/event/price_policy/',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TPricePolicyData[] = req.body;
                const pricePolices = await ppController.updatePricePolices(data);
                const result = getSerializedArray(pricePolices);
                res.json(result);
            })
        ]
    },
    // params: id_cat
    {
        path: '/event/price_policy/',
        method: 'get',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const id: string = req.query.id_cat as string;
                const pricePolices = await ppController.getPricePolicesByCatId(id);
                const result = getSerializedArray(pricePolices);
                res.json(result);
            })
        ]
    },
    // params: id_cat, days
    {
        path: '/event/price_policy/',
        method: 'delete',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response) => {
                const id: string = req.query.id_cat as string;
                const days: string = req.query.days as string;
                const result = await ppController.deletePricePolicy(id, days);
                res.json(result);
            })
        ]
    }

];
