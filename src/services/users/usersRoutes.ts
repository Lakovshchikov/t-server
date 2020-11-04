import { Request, Response } from 'express';
import usersController from './usersController';

export default [
    {
        path: '/user',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const user = await usersController.getUserByEmail(req.query.email.toString());
        }
    }
];
