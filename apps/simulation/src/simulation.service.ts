import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HISTORY_SERVICE, VIDEO_SERVICE } from './constants/services';
import { STORE_HISTORY } from '@app/common/constants/events';

@Injectable()
export class SimulationService {
  constructor(
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
  ) { }
  
  getHello(): string {
    return 'Hello World!';
  }

  simulateUser(data: any) {
    this.historyClient.emit(STORE_HISTORY,{})
    console.log(data, "<- in simulation service")
  }
}
