import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => Int)
  duration: number

  @Field(() => Int)
  totalClick: number

  @Field(() => Int)
  totalPlayed: number
}
