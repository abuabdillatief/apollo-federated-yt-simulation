import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI:  Joi.string().required(),
        RABBIT_MQ_HISTORY_QUEUE:  Joi.string().required(),
      }),
      envFilePath :"./apps/history/.env"
    })
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule { }
