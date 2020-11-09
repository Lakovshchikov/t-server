import 'reflect-metadata';
import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import { copy } from 'fs-extra';
import * as util from 'util';
import https from 'https';
import express from 'express';
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './utils';
import middleware, { initMiddleware } from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { typeOrmConfig } from './ormconfig';

const readFile = util.promisify(fs.readFile);
const copyAs = util.promisify(copy);
const { PORT = 3000 } = process.env;

process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});

const router = express();

(async function startServer() {
    createConnection(typeOrmConfig).then(async (connection) => {
        await copyAs(path.resolve(__dirname, '../static'), path.resolve(__dirname, '../dist/static'));
        const [ key, cert ] = await Promise.all([
            readFile('cert/key.pem'),
            readFile('cert/cert.pem')
        ]);
        const server = await https.createServer({ key, cert }, router);
        const inited = await initMiddleware();

        if (inited === true) {
            applyMiddleware(middleware, router);
            applyRoutes(routes, router);
            applyMiddleware(errorHandlers, router);

            server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
        } else {
            console.warn(inited);
        }
    }).catch((e) => {
        console.log(e);
    });
}());
