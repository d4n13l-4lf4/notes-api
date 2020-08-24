import { registerAs } from '@nestjs/config';

export default registerAs('login', () => ({
  listener_host: process.env.LOGZIO_LISTENER_HOST,
  token: process.env.LOGZIO_TOKEN,
  level: process.env.LOG_LEVEL,
}));
