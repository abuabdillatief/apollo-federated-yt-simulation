import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { History } from './history.model';

@Injectable()
export class HistoryRepository extends AbstractRepository<History> {
    protected readonly logger = new Logger(HistoryRepository.name)

    constructor(
        @InjectModel(History.name) userModel: Model<History>,
        @InjectConnection() connection: Connection
    ) {
        super(userModel, connection)
    }
}
