import { AuthHeader } from '@app/common/auth/auth.header';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import * as random from 'random-name';
import { v4 as uuid } from 'uuid';
import { CreateUserResponse, User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.find();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => CreateUserResponse)
  createUser(@Context() context) {
    let req = context.req as IncomingMessage & { headers: AuthHeader };
    return this.usersService.create({
      id: uuid(),
      name: random.first() + " " + random.middle(),
      createdAt: new Date()
    }, req.headers);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.findOneAndUpdate({ _id: updateUserInput.id }, {})
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService
  // }


  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: string }) {
  //   return this.usersService.findOne(reference.id);
  // }
}
