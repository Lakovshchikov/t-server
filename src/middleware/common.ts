import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import session, { SessionOptions } from 'express-session';
import compression from 'compression';
import dotenv from 'dotenv';
import connectPgSimple, { PGStoreOptions } from 'connect-pg-simple';
import { getConnection } from 'typeorm';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import { Pool } from 'pg';

const PGStore = connectPgSimple(session);

dotenv.config();

const storeConfig: PGStoreOptions = {};

const sessionSettings: SessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: 'ticket_o.sid',
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 24,
        httpOnly: true
    }
};

export function initConfig():Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        try {
            const connection = getConnection();
            let pool = null;
            if (connection.driver instanceof PostgresDriver) {
                pool = connection.driver.master as Pool;
            }
            storeConfig.pool = pool;
            sessionSettings.store = new PGStore(storeConfig);
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
    return promise;
}

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleSession = (router: Router) => {
    router.use(session(sessionSettings));
};
