import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(VideosModule);
  app.useGlobalPipes(new ValidationPipe())
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('VIDEOS', true));
  await app.startAllMicroservices()
  await app.listen(3002);
}
bootstrap();
