import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { PrismaService } from './prisma/prisma.service';
import { Video } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) { }

  create(createVideoInput: CreateVideoInput) {
    return this.prisma.video.create({
      data: createVideoInput
    })
  }

  findAll(): Promise<Video[]> {
    return this.prisma.video.findMany()
  }

  findOne(id: number) {
    return this.prisma.video.findUnique({ where: { id }, select: { duration: true } })
  }

  update(id: number, { totalClick, totalPlayed }: UpdateVideoInput) {
    return this.prisma.video.update({
      where: { id }, data: {
        totalClick, totalPlayed
      }
    })
  }

  remove(id: number) {
    return this.prisma.video.delete({ where: { id } })
  }
}
