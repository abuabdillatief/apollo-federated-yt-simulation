import { AbstractDocument } from '@app/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { registerEnumType } from "@nestjs/graphql";
import { Activity } from 'apps/simulation/src/models/actionDetail.model';


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


export const UserSchema = SchemaFactory.createForClass(User)
// import { AbstractDocument } from '@app/common';
// import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import {  registerEnumType } from "@nestjs/graphql";

// export enum Activity {
//   UNSET = 'unset',
//   CLICK = 'click',
//   SKIP = 'skip',
//   PAUSE = 'pause',
//   PLAY = 'play',
// }

// @ObjectType()
// @Schema()
// export class User extends AbstractDocument {
//   @Prop()
//   @Field(() => ID)
//   id!: string
  
//   @Prop()
//   @Field()
//   name!: string
  
//   @Prop()
//   @Field()
//   createdAt!: Date

//   @Prop({ enum: Activity, default: Activity })
//   @Field(() => Activity, { nullable: true })
//   activity?: Activity;
// }



// export const UserSchema = SchemaFactory.createForClass(User)