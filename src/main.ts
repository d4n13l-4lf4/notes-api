import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  const url = await app.getUrl();
  console.log(`Listening on ${url}`);
}

bootstrap();
