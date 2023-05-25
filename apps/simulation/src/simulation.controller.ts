import { SIMULATE_USER } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
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

  @MessagePattern(SIMULATE_USER)
  async simulateUser(@Payload() data: RmqMessageValue<User>, @Ctx() context: RmqContext) {
     await this.simulationService.simulateUser(data.value)
  }
}
