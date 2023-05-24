import { AbstractRepository } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { VIDEO_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { lastValueFrom } from 'rxjs';
import { USER_CREATED } from '@app/common/constants/events';

@Injectable()
export class UsersService {
  protected readonly logger = new Logger(User.name)
  constructor(
    private readonly usersRespository: UsersRepository,
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy
  ) { }


  async create(input: Omit<User, "_id">) {
    try {
      const user = await this.usersRespository.create(input)
      await lastValueFrom(this.videoClient.emit(USER_CREATED, {
        input
      }))
      return user
    } catch (err) {
      throw err
    }
  }
}
