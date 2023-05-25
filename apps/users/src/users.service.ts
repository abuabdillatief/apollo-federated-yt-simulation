import { SIMULATE_USER, USER_CREATED } from '@app/common/constants/events';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { VideoClient } from './clients/video.client';
import { SIMULATION_SERVICE, VIDEO_SERVICE } from './constants/services';
import { User } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  protected readonly logger = new Logger(User.name)
  constructor(
    private readonly usersRespository: UsersRepository,
    @Inject(SIMULATION_SERVICE) private simulationClient: ClientProxy,
  ) { }


  async create(input: Omit<User, "_id">) {
    try {
      const user = await this.usersRespository.create(input)
      this.simulationClient.emit(SIMULATE_USER, user)
      return user
    } catch (err) {
      throw err
    }
  }

  async find() {
    return this.usersRespository.find({})
  }

  async findOne(id: string) {
    var res = await VideoClient.call(`
    `)
    return this.usersRespository.findOne({ id: id })
  }

}
