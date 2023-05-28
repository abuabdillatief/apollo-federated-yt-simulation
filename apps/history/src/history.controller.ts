import { STORE_HISTORY } from '@app/common/constants/events';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { Controller } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { EventPattern, Payload } from '@nestjs/microservices';
import { History } from './history.model';
import { HistoryService } from './history.service';
import { PubSub } from 'graphql-subscriptions';


const pubSub = new PubSub()
@Resolver(() => History)
@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @EventPattern(STORE_HISTORY)
  async handleStoreHistory(@Payload() data: RmqMessageValue<History>) {
    const res = await this.historyService.store(data.value)
    pubSub.publish('historyAdded', { historyAdded: res })
    console.log("pubsub added")
    return res
  }

  @Query(() => History, {name:'history'})
  getHello():History {
    return new History()
  }

  @Subscription(() => History)
  historyAdded() {
    console.log("here subscription runs")
    return pubSub.asyncIterator('historyAdded')
  }
}
