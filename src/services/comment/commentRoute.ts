import { Comment } from '@services/comment/comment';
import { NextFunction, Request, Response } from 'express';
import { TCommentReqData, IComment, TConfirmCommentReqData } from '@services/comment/commentTypes';
import commentController from '@services/comment/commentController';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';

const checkUserType = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (commentController.checkUser(user)) {
        next();
    } else {
        next(createHttpError(401, 'Unauthorized', { redirectUrl: '/org/login' }));
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
            asyncHandler(async (req: Request, res: Response) => {
                const id = req.query.id_ev;
                const comments = await commentController.getCommentsByEventId(id.toString());
                if (comments.length) {
                    const result: (Record<string, any>)[] = [];
                    comments.forEach((c: Comment) => {
                        result.push(c.serialize());
                    });
                    res.json(result);
                } else {
                    throw createHttpError(404, 'Сomments are not available for this event');
                }
            })

        ]
    },
    {
        path: '/analytics/comments/',
        method: 'post',
        handler: [
            checkUserType,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TCommentReqData = req.body;
                const comments = await commentController.predictComments(data);
                if (comments) {
                    const result = comments.map((c:Comment) => c.serialize());
                    res.json(result);
                } else {
                    throw createHttpError(500, 'Predict comments error');
                }
            })
        ]
    },
    {
        path: '/analytics/comments/confirmation',
        method: 'put',
        handler: [
            checkUserType,
            asyncHandler(async (req: Request, res: Response) => {
                const data: TConfirmCommentReqData = req.body;
                const comments = await commentController.confirmPrediction(data);
                if (comments) {
                    const result = comments.map((c:Comment) => c.serialize());
                    res.json(result);
                } else {
                    throw createHttpError(500, 'Predict comments error');
                }
            })
        ]
    }
];
