import { Video } from '../entities/video.entity';
import { CreateVideoInput } from './create-video.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(Video) {
  @Field(() => Int)
  id: string;
}
