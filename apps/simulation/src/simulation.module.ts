import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SIMULATION_QUEUE: Joi.string().required(),
      }),
      envFilePath:'./apps/simulation/.env'
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    }),
    RmqModule],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule { }
