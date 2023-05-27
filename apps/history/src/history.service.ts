import { Injectable } from '@nestjs/common';
import { History } from './histoy.model';
import { HistoryRepository } from './history.repository';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { User } from 'apps/users/src/models/user.model';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository
  ) { }

  async store(history: History) {
    try {
      const res: History = await this.historyRepository.create(history)
      return res
    } catch (err) {
      throw err
    }
  }
}
