import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private videoRepository: MongoRepository<Video>
  ) { }

  create(input: CreateVideoInput): Promise<Video> {
    const video = this.videoRepository.create({
      id: uuid(),
      totalClick: input.totalClick,
      totalPlayed: input.totalClick,
      duration: input.duration
    })
    return this.videoRepository.save(video)
  }

  findAll(): Promise<Video[]> {
    return this.videoRepository.find()
  }

  findOne(id: string) {
    return this.videoRepository.findOne({ where: { id: id } })
  }

  async update(id: string, { totalClick, totalPlayed }: UpdateVideoInput): Promise<Video> {
    const video = await this.videoRepository.findOne({where:{id}})
    video.totalClick = totalClick
    video.totalPlayed = totalPlayed
    return this.videoRepository.save(video)
  }

  remove(id: string) {
    return this.videoRepository.deleteOne({id:id})
  }
}
