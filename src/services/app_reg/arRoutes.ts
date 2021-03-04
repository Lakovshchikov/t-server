import { NextFunction, Request, Response } from 'express';
import arController from '@services/app_reg/arController';
import { AppReg } from '@services/app_reg/app_reg';

export default [
    // Получение заявки на регистрацию
    // query params: org_id
    // TO DO ts-ignore, подумать как избавиться
    {
        path: '/app/reg/',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                const { user } = req;
                let orgId;
                let response: gt.TResponse;
                let appReg: AppReg;
                if (user) {
                    if (arController.checkUser(user) && arController.checkAdminPermission(user)) {
                        orgId = req.query.org_id;
                        if (orgId) {
                            response = await arController.getAppRegByOrgId(orgId.toString());
                            if (response.isSuccess) {
                                appReg = response.data;
                            } else {
                                res.sendStatus(404);
                                return;
                            }
                        }
                    } else if (arController.checkOrg(user)) {
                        // @ts-ignore
                        appReg = user.app_reg;
                    }
                    if (appReg) {
                        res.json(appReg.serialize());
                        return;
                    } else {
                        res.sendStatus(404);
                        return;
                    }
                }
                res.redirect(403, '/login');
            }
        ]
    },

    // Изменение параметров заявки на регистрацию администратором
    {
        path: '/app/reg',
        method: 'post',
        handler: [
            async (req: Request, res: Response) => {
                const { user } = req;
                if (arController.checkUser(user) && arController.checkAdminPermission(user)) {
                    const response = await arController.editAppReg(req.body);
                    if (response.isSuccess) {
                        const appReg = response.data as AppReg;
                        res.json(appReg.serialize());
                    } else {
                        res.status(409).send(response.error);
                    }
                } else {
                    res.redirect(403, '/login');
                }
            }
        ]
    }
];
