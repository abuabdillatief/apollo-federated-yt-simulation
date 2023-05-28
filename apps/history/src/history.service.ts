import { Injectable } from '@nestjs/common';
import { History } from './history.model';
import { HistoryRepository } from './history.repository';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository
  ) { }

  async store(history: History): Promise<History> {
    try {
      const res: History = await this.historyRepository.create(history)
      return res
    } catch (err) {
      throw err
    }
  }
}
