import { Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import usersController from './usersController';

export default [
    {
        path: '/login',
        method: 'post',
        handler: [
            passport.authenticate('local', { failureRedirect: '/login' }),
            (req: Request, res: Response) => {
                res.redirect('/');
            }
        ]
    },
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
    {
        path: '/reg',
        method: 'post',
        handler: (req: Request, res: Response) => {

        }
    },
    {
        path: '/logout',
        method: 'get',
        handler: (req: Request, res: Response) => {
            req.logOut();
            res.clearCookie('ticket_o.sid');
            res.redirect('/login');
        }
    },
    {
        path: '/user',
        method: 'post',
        handler: (req: Request, res: Response) => {
        }
    },
    {
        path: '/user',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const user = await usersController.getUserByEmail(req.query.email.toString());
            if (user) {
                res.send(user.name);
            } else {
                res.send('not found');
            }
        }
    },
    {
        path: '/',
        method: 'get',
        handler: (req: Request, res: Response) => {
            if (req.user !== undefined) {
                res.send('main');
            } else {
                res.redirect('/login');
            }
        }
    }
];
