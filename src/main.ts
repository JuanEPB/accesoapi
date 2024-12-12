import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v3.4/acces');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
