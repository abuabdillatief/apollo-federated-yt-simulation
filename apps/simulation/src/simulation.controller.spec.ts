import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';

describe('SimulationController', () => {
  let simulationController: SimulationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [SimulationService],
    }).compile();

    simulationController = app.get<SimulationController>(SimulationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(simulationController.getHello()).toBe('Hello World!');
    });
  });
});
