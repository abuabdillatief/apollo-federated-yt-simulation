import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) { }

  @Mutation(() => Video)
  createVideo(@Args('input') input: CreateVideoInput) {
    return this.videosService.create(input);
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
