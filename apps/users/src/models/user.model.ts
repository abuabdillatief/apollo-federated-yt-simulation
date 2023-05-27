import { AbstractDocument, Activity } from '@app/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@ObjectType()
@Schema()
export class User extends AbstractDocument {
  @Prop()
  @Field(() => ID)
  id!: string

  @Prop()
  @Field()
  name!: string

  @Prop()
  @Field()
  createdAt!: Date

  @Prop({default: []})
  @Field(() => [HistoryLog], { defaultValue: [] })
  logs?: HistoryLog[]
}
@ObjectType()
export class HistoryLog {
  @Field()
  userId: string
  @Field()
  videoId: string
  @Field()
  createdAt: number
  @Field()
  duration: number
  
  @Prop({type:Activity})
  @Field(() => Activity, { nullable: true })
  activity: Activity
}

@ObjectType()
export class CreateUserResponse {
  @Field(() => User)
  user:User

  @Field()
  token:string
}


export const UserSchema = SchemaFactory.createForClass(User)