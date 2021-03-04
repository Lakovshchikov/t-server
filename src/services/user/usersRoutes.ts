import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import usersController from './usersController';
import { User } from './user';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (user instanceof User) {
        next();
    } else {
        res.redirect(401, '/login');
        // res.status(401).location('/login').end();
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
        handler: async (req: Request, res: Response) => {
            try {
                const response: gt.TResponse = await usersController.registerUser(req.body);
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
            res.redirect('/');
        }
    },
    // Редактирование информации о пользователе
    {
        path: '/user',
        method: 'post',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                const { user } = req;
                const response: gt.TResponse = await usersController.changeUserInfo({
                    // @ts-ignore
                    ...req.body, email: user.email
                });
                if (response.isSuccess) {
                    res.redirect('/user');
                } else {
                    console.error(response.error.message);
                    res.status(403).send(response.error);
                }
            }
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
