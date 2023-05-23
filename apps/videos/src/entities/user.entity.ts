import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Video } from 'apps/videos/src/entities/video.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  currentVideoId:number;

}
