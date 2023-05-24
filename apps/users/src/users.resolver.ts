import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { v4 as uuid } from 'uuid'
import * as random  from 'random-name'
import { RmqService } from '@app/common/rmq/rmq.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Mutation(() => User)
  createUser() {
    return this.usersService.create({
      id: uuid(),
      name: random.first() + " " + random.middle(),
      createdAt: new Date()
    });
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.find({});
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id') id: string) {
  //   return this.usersService.findOne({ _id: id });
  // }

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
