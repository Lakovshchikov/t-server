import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { IPromoCode, TPromoCodeData } from '@services/promocode/types';
import { getSerializedArray } from 'routes_utils/dist';
import pcController from './pcController';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (pcController.checkUser(user)) {
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
        const data: TPromoCodeData[] = req.body;
        iD = data[0].id_cat;
    }
    // @ts-ignore
    const hasPermission = await pcController.checkPermission(iD, user.id);
    if (hasPermission) {
        next();
    } else {
        throw createHttpError(403, 'The user does not have permission to do this.');
    }
});

export default [
    {
        path: '/event/promo_code/',
        method: 'post',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const data: TPromoCodeData[] = req.body;
                const prCodes = await pcController.createPromoCodes(data);
                const result = getSerializedArray(prCodes);
                res.json(result);
            })
        ]
    },
    // param id_cat - для проверки доступа
    {
        path: '/event/promo_code/',
        method: 'put',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const data: TPromoCodeData[] = req.body;
                const prCodes = await pcController.updatePromoCodes(data);
                const result = getSerializedArray(prCodes);
                res.json(result);
            })
        ]
    },
    // params: id_cat || id
    {
        path: '/event/promo_code/',
        method: 'get',
        handler: [
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const idCat: string = req.query.id_cat as string;
                const id: string = req.query.id as string;
                if ((id && idCat) || (id === undefined && idCat === undefined)) {
                    throw createHttpError(400, 'The request must contain one of two parameters: id or id_cat');
                }
                let prCodes: IPromoCode[];
                if (id) {
                    prCodes = await pcController.getPromoCodesById(id);
                } else {
                    prCodes = await pcController.getPromoCodesByCatId(idCat);
                }
                const result = getSerializedArray(prCodes);
                res.json(result);
            })
        ]
    },
    // params: id, id_cat
    {
        path: '/event/promo_code/',
        method: 'delete',
        handler: [
            checkUserType,
            checkPermission,
            asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
                const id: string = req.query.id as string;
                const result = await pcController.deletePromoCode(id);
                res.json(result);
            })
        ]
    }
];
