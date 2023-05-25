import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HISTORY_SERVICE, VIDEO_SERVICE } from './constants/services';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SIMULATION_QUEUE: Joi.string().required(),
      }),
      envFilePath:'./apps/simulation/.env'
    }),
    RmqModule.register({
      name: VIDEO_SERVICE,
    }),
    RmqModule.register({
      name: HISTORY_SERVICE,
    }),
    RmqModule],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule { }
