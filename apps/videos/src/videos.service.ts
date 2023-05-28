import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';
import * as randomTitle from 'random-title'
import { SimulationService } from 'apps/simulation/src/simulation.service';
import { GetVideosInput } from './dto/get-videos.input';

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
      totalPaused: 0,
      totalPlayed: 0,
      totalSkip: 0,
      duration: VideosService.generateRandomDuration(15)
    })
    return this.videoRepository.save(video)
  }

  findAll(input: GetVideosInput): Promise<Video[]> {
    return this.videoRepository.find({
      where: {},
      order: {
        [input.sortBy]: 'DESC'
      }
    })
  }

  findOne(id: string) {
    return this.videoRepository.findOne({ where: { id: id } })
  }

  async update(id: string, { totalPaused, totalPlayed, totalSkip }: UpdateVideoInput): Promise<Video> {
    const video: Video = await this.videoRepository.findOne({ where: { id } })
    video.totalPaused += totalPaused ?? 0
    video.totalPlayed += totalPlayed ?? 0
    video.totalSkip += totalSkip ?? 0
    return this.videoRepository.save(video)
  }

  remove(id: string) {
    return this.videoRepository.deleteOne({ id: id })
  }
}
