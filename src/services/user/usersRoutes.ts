import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import usersController from './usersController';
import { User } from './user';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (user instanceof User) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/login' }));
    }
};

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
        handler: [
            (req: Request, res: Response) => {
                const { user } = req;
                if (user instanceof User) {
                    res.redirect('/user');
                } else {
                    // res.sendStatus(200);
                    res.sendFile(path.resolve(__dirname, '../../static/login.html'));
                }
            }
        ]
    },
    // Регистрация пользователя
    {
        path: '/reg',
        method: 'post',
        handler: [
            asyncHandler(async (req: Request, res: Response) => {
                const user = await usersController.registerUser(req.body);
                if (user) {
                    req.login(user, (err) => {
                        if (err) {
                            console.error(err);
                            res.redirect('/login');
                            return;
                        }
                        res.redirect('/');
                    });
                } else {
                    throw createHttpError(500, 'InternalServerError. Reg user error');
                }
            })
        ]
    },
    // Логаут пользователя
    {
        path: '/logout',
        method: 'get',
        handler: (req: Request, res: Response) => {
            req.logOut();
            res.clearCookie('ticket_o.sid');
            res.redirect('/');
        }
    },
    // Редактирование информации о пользователе
    {
        path: '/user',
        method: 'post',
        handler: [
            checkUserType,
            asyncHandler(
                async (req: Request, res: Response) => {
                    const { user } = req;
                    const appUser = await usersController.changeUserInfo({
                        // @ts-ignore
                        ...req.body, email: user.email
                    });
                    if (appUser) {
                        res.redirect('/user');
                    } else {
                        throw createHttpError(500, 'InternalServerError. Edit user error');
                    }
                }
            )
        ]
    },
    // Страница пользователя
    {
        path: '/user',
        method: 'get',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                res.sendFile(path.resolve(__dirname, '../../static/changeInfoUser.html'));
            }
        ]
    },
    // Главная страница
    {
        path: '/',
        method: 'get',
        handler: (req: Request, res: Response) => {
            res.send('main');
        }
    }
];
