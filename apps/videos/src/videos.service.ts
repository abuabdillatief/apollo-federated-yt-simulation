import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideosService {
  constructor() { }

  create(createVideoInput: CreateVideoInput) {
    // return this.prisma.video.create({
    //   data: createVideoInput
    // })
  }

  findAll() {
    // return this.prisma.video.findMany()
  }

  findOne(id: string)  {
    // return this.prisma.video.findUnique({
    //   where: { id }, select: {
    //     id: true,
    //     totalClick: true,
    //     totalPlayed: true,
    //     duration: true
    //   }
    // })
  }

  update(id: string, { totalClick, totalPlayed }: UpdateVideoInput) {
    // return this.prisma.video.update({
    //   where: { id }, data: {
    //     totalClick, totalPlayed
    //   }
    // })
  }

  remove(id: string) {
    // return this.prisma.video.delete({ where: { id } })
  }
}
