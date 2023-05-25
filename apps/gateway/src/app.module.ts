import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { authContext } from './auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'userss',
              url: 'http://127.0.0.1:3001/graphql'
            },
            {
              name: 'videos',
              url: 'http://127.0.0.1:3002/graphql'
            },
            {
              name: 'simulation',
              url: 'http://127.0.0.1:3003/graphql'
            },
          ]
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'user',
                context.user ? JSON.stringify(context.user) : null,
              );
            },
          });
        },
      }
    })
  ],
  providers: [AppService],
})
export class AppModule { }
