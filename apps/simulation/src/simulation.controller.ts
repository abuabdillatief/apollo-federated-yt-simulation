import { Controller, Get } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SIMULATE_USER } from '@app/common/constants/events';

@Controller()
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get()
  getHello(): string {
    return this.simulationService.getHello();
  }

  @EventPattern(SIMULATE_USER)
  async simulateUser(@Payload() data:any) {
    this.simulationService.simulateUser(data)
  }
}
