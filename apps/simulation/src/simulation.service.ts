import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HISTORY_SERVICE, VIDEO_SERVICE } from './constants/services';
import { STORE_HISTORY } from '@app/common/constants/events';
import { User } from 'apps/users/src/models/user.model';

@Injectable()
export class SimulationService {
  constructor(
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
  ) { }

  generateRandomDuration(): number {
    return Math.floor(Math.random() * 60) + 1;
  }

  async simulateUser(data: User) {
    const duration = this.generateRandomDuration();
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    while (Date.now() < endTime) {
      console.log(data.name, " is active")
    }
    console.log(data.name, " is finished")
  }
}
