import { Request, Response, NextFunction, Router } from 'express';
import { HttpError } from 'http-errors';
import * as ErrorHandler from '../utils/errorHandler';

const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response) => {
        ErrorHandler.notFoundError();
    });
};

const handleClientError = (router: Router) => {
    router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.clientError(err, res, next);
    });
};

const handleServerError = (router: Router) => {
    router.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.serverError(err, res, next);
    });
};

export default [ handle404Error, handleClientError, handleServerError ];
