import { STORE_HISTORY } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HistoryService } from './history.service';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { HistoryInput } from './histoy.model';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @EventPattern(STORE_HISTORY)
  async handleStoreHistory(@Payload() data: RmqMessageValue<HistoryInput>) {
    console.log(data, "<--- store history in history",)
  }
}
