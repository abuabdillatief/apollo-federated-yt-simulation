import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';
import * as randomTitle from 'random-title'
import { SimulationService } from 'apps/simulation/src/simulation.service';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private videoRepository: MongoRepository<Video>
  ) { }

  static generateRandomDuration(max?: number): number {
    return Math.floor(Math.random() * max ?? 60) + 1;
  }


  create(): Promise<Video> {
    const video = this.videoRepository.create({
      id: uuid(),
      title: randomTitle(),
      totalClick: 0,
      totalPlayed: 0,
      duration: VideosService.generateRandomDuration(15)
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
    const video = await this.videoRepository.findOne({ where: { id } })
    video.totalClick = totalClick
    video.totalPlayed = totalPlayed
    return this.videoRepository.save(video)
  }

  remove(id: string) {
    return this.videoRepository.deleteOne({ id: id })
  }
}
