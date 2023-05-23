import { DatabaseModule } from '@app/common';
import { RmqModule } from '@app/common/rmq/rmq.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { User, UserSchema } from './models/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>(
      {
        driver: ApolloFederationDriver,
        autoSchemaFile: {
          federation: 2
        }
      }
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_USERS_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
    }),
    RmqModule,
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule { }
