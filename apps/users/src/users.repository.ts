import { AbstractRepository } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './models/user.model';
import { VIDEO_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { connect } from 'http2';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UsersRepository.name)

    constructor(
        @InjectModel(User.name) userModel: Model<User>,
        @InjectConnection() connection: Connection
    ) {
        super(userModel, connection)
    }
}
