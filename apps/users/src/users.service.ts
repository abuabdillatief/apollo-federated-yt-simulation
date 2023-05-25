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
    @Inject(VIDEO_SERVICE) private videoClient: ClientProxy,
    @Inject(SIMULATION_SERVICE) private simulationClient: ClientProxy,
  ) { }


  async create(input: Omit<User, "_id">) {
    try {
      console.log(input)
      const user = await this.usersRespository.create(input)
      await lastValueFrom(
        this.simulationClient.emit(SIMULATE_USER, {
          input
        })
      )

      console.log(user)
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
