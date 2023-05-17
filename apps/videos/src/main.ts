import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';

async function bootstrap() {
  const app = await NestFactory.create(VideosModule);
  await app.listen(3000);
}
bootstrap();
