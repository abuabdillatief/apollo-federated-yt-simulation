import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { VideosModule } from 'apps/videos/src/videos.module';

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
    VideosModule,
    PrismaModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule { }
