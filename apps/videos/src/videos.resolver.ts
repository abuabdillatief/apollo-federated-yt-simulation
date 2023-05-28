import { UPDATE_VIDEO } from '@app/common/constants/events';
import { RmqMessageValue } from '@app/common/rmq/rmq.message';
import { Controller } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GetVideosInput } from './dto/get-videos.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';
import { VideosService } from './videos.service';
@Controller()
@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) { }
  
  @EventPattern(UPDATE_VIDEO)
  async handleUpdateVideo(@Payload() data: RmqMessageValue<UpdateVideoInput>) {
    return this.videosService.update(data.value.id, data.value)
  }

  @Mutation(() => Video)
  createVideo() {
    return this.videosService.create();
  }

  @Query(() => [Video], { name: 'videos' })
  videos(@Args('input') input: GetVideosInput) {
    return this.videosService.findAll(input);
  }

  @Query(() => Video, { name: 'video' })
  findOne(@Args('id') id: string) {
    return this.videosService.findOne(id);
  }


  @Mutation(() => Video)
  updateVideo(@Args('input') input: UpdateVideoInput) {
    return this.videosService.update(input.id, input);
  }

  @Mutation(() => Video)
  removeVideo(@Args('id') id: string) {
    return this.videosService.remove(id);
  }
}
