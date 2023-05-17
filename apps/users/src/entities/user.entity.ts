import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Video } from 'apps/videos/src/entities/video.entity';

@ObjectType()
@Directive('@key(fields: "id")')
// this tells apollo federation how to identify a given user entity
// by its 'id'
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  currentVideoId:number;

  @Field(() => Video)
  currentVideo:Video
}
