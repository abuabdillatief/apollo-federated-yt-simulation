import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';

@Injectable()
export class UsersService extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name)

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
  ) {
    super(userModel)
  }
}
