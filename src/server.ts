import 'reflect-metadata';
import http from 'http';
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
applyMiddleware(errorHandlers, router);
applyRoutes(routes, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

(async function startServer() {
  createConnection(typeOrmConfig).then((connection) => {
    console.log(connection);
    server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
  }).catch((e) => {
    console.log(e);
  });
}());
