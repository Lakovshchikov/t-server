import { Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import { TResponse } from '@services/user/userTypes';
import usersController from './usersController';

export default [
    // Аутентификация пользователя
    {
        path: '/login',
        method: 'post',
        handler: [
            passport.authenticate('localUser', { failureRedirect: '/login' }),
            (req: Request, res: Response) => {
                res.redirect('/user');
            }
        ]
    },
    // Страница регистрации пользователя (d)
    {
        path: '/login',
        method: 'get',
        handler: (req: Request, res: Response) => {
            if (req.user !== undefined) {
                res.redirect('/');
            } else {
                res.sendFile(path.resolve(__dirname, '../../static/index.html'));
            }
        }
    },
    // Регистрация пользователя
    {
        path: '/reg',
        method: 'post',
        handler: async (req: Request, res: Response) => {
            try {
                const response:TResponse = await usersController.registerUser(req.body);
                if (response.isSuccess) {
                    req.login(response.data, (err) => {
                        if (err) {
                            console.error(err);
                            res.redirect('/login');
                            return;
                        }
                        res.redirect('/');
                    });
                } else {
                    console.error(response.error.message);
                    res.status(403).send(response.error);
                }
            } catch (e) {
                res.status(500).send(e.message);
            }
        }
    },
    // Логаут пользователя
    {
        path: '/logout',
        method: 'get',
        handler: (req: Request, res: Response) => {
            req.logOut();
            res.clearCookie('ticket_o.sid');
            res.redirect('/login');
        }
    },
    // Редактирование информации о пользователе
    {
        path: '/user',
        method: 'post',
        handler: async (req: Request, res: Response) => {
            const { user } = req;
            if (user !== undefined) {
                const response: TResponse = await usersController.changeUserInfo({
                    // @ts-ignore
                    ...req.body, email: user.email
                });
                if (response.isSuccess) {
                    res.redirect('/user');
                } else {
                    console.error(response.error.message);
                    res.status(403).send(response.error);
                }
            } else {
                res.status(401).send();
            }
        }
    },
    // Страница пользователя
    {
        path: '/user',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const { user } = req;
            if (user !== undefined) {
                res.sendFile(path.resolve(__dirname, '../../static/changeInfoUser.html'));
            } else {
                res.redirect('/login');
            }
        }
    },
    // Главная страница
    {
        path: '/',
        method: 'get',
        handler: (req: Request, res: Response) => {
            const { user } = req;
            if (user !== undefined) {
                res.send('main');
            } else {
                res.redirect('/login');
            }
        }
    }
];
