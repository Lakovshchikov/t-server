import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import orgController from './orgController';
import { TResponse } from './orgTypes';
import { Organization } from './org';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (user instanceof Organization) {
        next();
    } else {
        res.redirect(401, '/org/login');
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
        handler: async (req: Request, res: Response) => {
            try {
                const response:TResponse = await orgController.registerOrg(req.body);
                if (response.isSuccess) {
                    req.login(response.data, (err) => {
                        if (err) {
                            console.error(err);
                            res.redirect('/org/login');
                            return;
                        }
                        res.redirect('/org');
                    });
                } else {
                    console.error(response.error.message);
                    res.status(403).send(response.error);
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        }
    }
    // // Логаут
];
