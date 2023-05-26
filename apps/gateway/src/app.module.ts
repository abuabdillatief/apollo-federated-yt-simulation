import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { authContext } from './auth.context';
import { AuthModule } from '@app/common/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),

    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => authContext(req, new ConfigService()),

      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users',
              url: 'http://127.0.0.1:3001/graphql'
            },
            {
              name: 'videos',
              url: 'http://127.0.0.1:3002/graphql'
            },
          ]
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null,);
              request.http.headers.set('authorization', context.authorization);
            },
          });
        },
      }
    }),

    AuthModule.register()
  ],
  providers: [AppService,],
})
export class AppModule { }