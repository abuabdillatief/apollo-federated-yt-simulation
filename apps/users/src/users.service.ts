import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create() {
    return this.prisma.user.create({
      data: {
        currentVideoId: 1
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
