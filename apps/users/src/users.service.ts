import { AuthHeader } from '@app/common/auth/auth.header';
import { AuthService } from '@app/common/auth/auth.service';
import { SIMULATE_USER } from '@app/common/constants/events';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VideoClient } from './clients/video.client';
import { SIMULATION_SERVICE } from './constants/services';
import { CreateUserResponse, User } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  protected readonly logger = new Logger(User.name)
  constructor(
    private readonly usersRespository: UsersRepository,
    @Inject(SIMULATION_SERVICE) private simulationClient: ClientProxy,
    private readonly authService: AuthService
  ) { }


  async create(input: Omit<User, "_id">, requestHeader: AuthHeader): Promise<CreateUserResponse> {
    try {
      const user = await this.usersRespository.create(input)
      const token = await this.authService.generateToken(user)
      const msg = new RmqMessageValue<User>({
        value: user,
        token: token
      })
      this.simulationClient.emit<string, RmqMessageValue<User>>(SIMULATE_USER, msg)
      return { token, user }
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
