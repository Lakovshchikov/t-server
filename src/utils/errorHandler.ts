import { Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { HTTPClientError, HTTP404Error } from './httpErrors';

export const notFoundError = () => {
    throw new HTTP404Error('Method not found.');
};

export const clientError = (err: HttpError, res: Response, next: NextFunction) => {
    if (err.statusCode.toString()[0] === '4') {
        if (err.redirectUrl) {
            res.status(err.statusCode).redirect(err.redirectUrl);
            return;
        }
        if (err[0]) {
            res.status(err.statusCode).send({ message: err.message, error: err[0] });
        }
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

export const serverError = (err: HttpError, res: Response, next: NextFunction) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    } else {
        res.status(500).send({ message: err.message, error: err.stack });
    }
};
