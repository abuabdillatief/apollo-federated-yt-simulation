import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { User } from './entities/user.entity';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly videosService: VideosService) { }

  @Mutation(() => Video)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videosService.create(createVideoInput);
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
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videosService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => Video)
  removeVideo(@Args('id') id: string) {
    return this.videosService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() video:  Video): any {
    return { __typename: 'User', id: 1 };
  }
}
