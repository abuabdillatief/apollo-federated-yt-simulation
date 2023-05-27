import { Activity, DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { User, UserSchema } from 'apps/users/src/models/user.model';
import { History, HistorySchema } from './histoy.model';
import { registerEnumType } from '@nestjs/graphql';
import { HistoryRepository } from './history.repository';
import { VIDEO_SERVICE } from 'apps/simulation/src/constants/services';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_HISTORY_QUEUE: Joi.string().required(),
      }),
      envFilePath: "./apps/history/.env"
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    RmqModule.register({ name: VIDEO_SERVICE })
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
})
export class HistoryModule {
  constructor() {
    registerEnumType(Activity, {
      name: 'Activity',
      description: 'Activity Types',
    });
  }
}
