import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { entities, migrations, subscribers } from './services';

dotenv.config();

export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1703',
  database: process.env.DB_NAME || 'Ticket operator',
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  entities: [
    ...entities
  ],
  migrations: [
    ...migrations
  ],
  subscribers: [
    ...subscribers
  ]
};
