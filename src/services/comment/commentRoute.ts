import { Comment } from '@services/comment/comment';
import { NextFunction, Request, Response } from 'express';
import { TCommentReqData, IComment, TConfirmCommentReqData } from '@services/comment/commentTypes';
import commentController from '@services/comment/commentController';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (commentController.checkUser(user)) {
        next();
    } else {
        res.redirect(401, '/login');
        // res.status(401).location('/login').end();
    }
};

export default [
    // query params: id_ev: UUID (eeaf3aa6-1f29-11eb-bb2a-9788dee8aa87)
    // TO DO необходима проверка, что мероприятие принадлежит данному организатору
    {
        path: '/analytics/comments/',
        method: 'get',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                try {
                    const id = req.query.id_ev;
                    const response = await commentController.getCommentsByEventId(id.toString());
                    if (response.isSuccess) {
                        const comments: Comment[] = response.data;
                        const result: (string | IComment)[] = [];
                        comments.forEach((c: Comment) => {
                            result.push(c.serialize());
                        });
                        res.json(result);
                    } else {
                        res.status(409).send(response.error);
                    }
                } catch (e) {
                    res.status(500).send(e.message);
                }
            }
        ]
    },
    {
        path: '/analytics/comments/',
        method: 'post',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                try {
                    const data: TCommentReqData = req.body;
                    const response: gt.TResponse = await commentController.predictComments(data);
                    if (response.isSuccess) {
                        const result = response.data.map((c:Comment) => c.serialize());
                        res.json(result);
                    } else {
                        res.status(500).send(response.error);
                    }
                } catch (e) {
                    res.status(500).send(e.message);
                }
            }
        ]
    },
    {
        path: '/analytics/comments/confirmation',
        method: 'put',
        handler: [
            checkUserType,
            async (req: Request, res: Response) => {
                try {
                    const data: TConfirmCommentReqData = req.body;
                    const response: gt.TResponse = await commentController.confirmPrediction(data);
                    if (response.isSuccess) {
                        const result = response.data.map((c:Comment) => c.serialize());
                        res.json(result);
                    } else {
                        res.status(500).send(response.error);
                    }
                } catch (e) {
                    res.status(500).send(e.message);
                }
            }
        ]
    }
];
