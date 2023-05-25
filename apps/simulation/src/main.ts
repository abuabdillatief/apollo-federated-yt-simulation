import { NestFactory } from '@nestjs/core';
import { SimulationModule } from './simulation.module';
import { RmqService } from '@app/common/rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(SimulationModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions("SIMULATION"))
  await app.startAllMicroservices();
}
bootstrap();
