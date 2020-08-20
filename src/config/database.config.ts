import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.MONGODB_HOST,
  port: process.env.DATABASE_PORT,
  uri: process.env.MONGODB_CONNECTION_URI,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWD,
  database: process.env.MONGODB_DB,
  authSource: process.env.MONGODB_AUTH_SOURCE
}));
