import { DatabaseModule, RmqModule } from '@app/common';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import * as Joi from 'joi';
import { SIMULATION_SERVICE, VIDEO_SERVICE } from './constants/services';
import {  User, UserSchema } from './models/user.model';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { Activity } from 'apps/simulation/src/models/actionDetail.model';
import { AuthModule } from '@app/common/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
    }),
    RmqModule.register({
      name: SIMULATION_SERVICE,
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule.register()
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
})

export class UsersModule {
  constructor() {
    registerEnumType(Activity, {
      name: 'Activity',
      description: 'Activity Types',
    });
  }
}
