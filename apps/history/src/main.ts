import { RmqService } from '@app/common/rmq/rmq.service';
import { NestFactory } from '@nestjs/core';
import { HistoryModule } from './history.module';

async function bootstrap() {
  const app = await NestFactory.create(HistoryModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions("HISTORY",true))
  await app.startAllMicroservices();
  await app.listen(3003)
}
bootstrap();
