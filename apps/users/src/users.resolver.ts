import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveReference, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Video } from 'apps/videos/src/entities/video.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User)
  createUser() {
    return this.usersService.create();
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }


  @ResolveReference()
  resolveReference(reference: { __typename: number, id: number }) {
    return this.usersService.findOne(reference.id)
  }

  @ResolveField(() => Video)
  video(@Parent() user: User): any {
    return { __typename: 'Video', id: user.currentVideoId }
  }
}
