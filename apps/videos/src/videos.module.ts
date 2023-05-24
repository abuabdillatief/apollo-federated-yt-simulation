import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { VideosResolver } from './videos.resolver';
import { VideosService } from './videos.service';
import { RmqModule } from '@app/common';
import { USER_SERVICE } from './constants/services';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb://127.0.0.1:27017/yt-simulation",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Video]
    }),
    TypeOrmModule.forFeature([Video]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    }),
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: './apps/videos/.env',
    }),
  ],
  controllers:[VideosResolver],
  providers: [VideosResolver, VideosService],
})
export class VideosModule { }
