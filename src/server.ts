import 'reflect-metadata';
import 'module-alias/register';
import fs from 'fs';
import * as util from 'util';
import https from 'https';
import express from 'express';
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { typeOrmConfig } from './ormconfig';

process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const readFile = util.promisify(fs.readFile);

(async function startServer() {
    createConnection(typeOrmConfig).then(async (connection) => {
        const [ key, cert ] = await Promise.all([
            readFile('cert/key.pem'),
            readFile('cert/cert.pem')
        ]);
        const server = await https.createServer({ key, cert }, router);
        server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
    }).catch((e) => {
        console.log(e);
    });
}());
