import { STORE_HISTORY } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @EventPattern(STORE_HISTORY)
  async handleStoreHistory() {
    console.log("store history")
  }
}
