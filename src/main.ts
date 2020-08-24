import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  const url = await app.getUrl();
  logger.log(`Listening on ${url}`);
}

bootstrap();
