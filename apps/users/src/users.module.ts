import { DatabaseModule, RmqModule } from '@app/common';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { User, UserSchema } from './models/user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { VIDEO_SERVICE } from './constants/services';
import { UsersRepository } from './users.repository';

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
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
    }),
    RmqModule.register({
      name: VIDEO_SERVICE,
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
})
export class UsersModule { }
