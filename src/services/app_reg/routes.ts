import { NextFunction, Request, Response } from 'express';
import arController from '@services/app_reg/controller';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import { IAppOrg } from '@services/app_reg/types';

export default [
    // Получение заявки на регистрацию
    // query params: org_id
    // TO DO ts-ignore, подумать как избавиться
    {
        path: '/app/reg/',
        method: 'get',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const { user } = req;
                let orgId;
                let appReg: IAppOrg;
                if (user) {
                    if (arController.checkUser(user) && arController.checkAdminPermission(user)) {
                        orgId = req.query.org_id;
                        if (orgId) {
                            appReg = await arController.getAppRegByOrgId(orgId.toString());
                        }
                    } else if (arController.checkOrg(user)) {
                        // @ts-ignore
                        appReg = user.app_reg;
                    }
                    if (appReg) {
                        res.json(appReg.serialize());
                        return;
                    } else {
                        throw createHttpError(404, 'AppReg with this id was not found');
                    }
                }
                throw createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' });
            })
        ]
    },

    // Изменение параметров заявки на регистрацию администратором
    {
        path: '/app/reg',
        method: 'post',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const { user } = req;
                if (arController.checkUser(user) && arController.checkAdminPermission(user)) {
                    const appReg = await arController.editAppReg(req.body);
                    if (appReg) {
                        res.json(appReg.serialize());
                    } else {
                        throw createHttpError(404, 'AppReg with this id was not found');
                    }
                } else {
                    throw createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' });
                }
            })
        ]
    }
];
