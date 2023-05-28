import { Activity, DatabaseModule, RmqModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { VIDEO_SERVICE } from 'apps/simulation/src/constants/services';
import * as Joi from 'joi';
import { HistoryController } from './history.controller';
import { History, HistorySchema } from './history.model';
import { HistoryRepository } from './history.repository';
import { HistoryService } from './history.service';

@Module({
  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: {},
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql'
        },

      },
    }),
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_HISTORY_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/history/.env',
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    RmqModule.register({ name: VIDEO_SERVICE }),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository, HistoryController],
})
export class HistoryModule {
  constructor() {
    registerEnumType(Activity, {
      name: 'Activity',
      description: 'Activity Types',
    });
  }
}
