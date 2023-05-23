import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(VideosModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3002);
}
bootstrap();
