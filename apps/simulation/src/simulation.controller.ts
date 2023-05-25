import { SIMULATE_USER } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SimulationService } from './simulation.service';
import { User } from 'apps/users/src/models/user.model';
import { RmqService } from '@app/common/rmq/rmq.service';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';

@Controller()
export class SimulationController {
  constructor(
    private readonly simulationService: SimulationService,
    private readonly rmqService: RmqService,
  ) { }

  @EventPattern(SIMULATE_USER)
  async simulateUser(@Payload() data: RmqMessageValue<User>, @Ctx() context: RmqContext) {
    console.log(context)
    await this.simulationService.simulateUser(data.value)
    this.rmqService.ack(context)
  }
}
