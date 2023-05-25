import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SIMULATE_USER, USER_CREATED } from '@app/common/constants/events';
import { Controller } from '@nestjs/common';
@Controller()
@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) { }
  @EventPattern(USER_CREATED)
  async handleUserCreated(@Payload() data: any) {
    console.log(data, "<- here in videos")
  }
  @Mutation(() => Video)
  createVideo() {
    return this.videosService.create();
  }

  @Query(() => [Video], { name: 'videos' })
  findAll() {
    return this.videosService.findAll();
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
