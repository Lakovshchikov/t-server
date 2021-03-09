import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import orgController from './controller';
import { Organization } from './org';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (user instanceof Organization) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
    }
};

export default [
    // Страница авторизации организации
    {
        path: '/org/login',
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                const { user } = req;
                if (user instanceof Organization) {
                    res.redirect('/org');
                } else {
                    // res.sendStatus(200);
                    res.sendFile(path.resolve(__dirname, '../../static/org/org_login.html'));
                }
            }
        ]
    },
    // Авторизация организации
    {
        path: '/org/login',
        method: 'post',
        handler: [
            passport.authenticate('localOrg', { failureRedirect: '/org/login' }),
            (req: Request, res: Response) => {
                res.redirect('/org');
            }
        ]
    },
    // Информация об организации
    {
        path: '/org',
        method: 'get',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                res.sendFile(path.resolve(__dirname, '../../static/org/org.html'));
            }
        ]
    },
    // // Изменение информации о организации
    // {
    //     path: '/org',
    //     method: 'post',
    //     handler: [
    //
    //     ]
    // },
    // Регистрация организации
    {
        path: '/org/reg',
        method: 'post',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const org = await orgController.registerOrg(req.body);
                if (org) {
                    req.login(org, (err) => {
                        if (err) {
                            console.error(err);
                            res.redirect('/org/login');
                            return;
                        }
                        res.redirect('/org');
                    });
                } else {
                    throw createHttpError(500, 'InternalServerError. Reg organization error');
                }
            })
        ]
    }
    // // Логаут
];
