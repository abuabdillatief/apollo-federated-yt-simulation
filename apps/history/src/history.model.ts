import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AbstractDocument, Activity } from '@app/common';

@ObjectType()
@Schema()
export class History extends AbstractDocument {
  @Prop()
  @Field(() => ID)
  userId: string;
  @Prop()
  @Field()
  videoId: string;
  @Prop()
  @Field()
  createdAt: number;
  @Prop()
  @Field()
  duration: number;
  @Prop({ type: String, default: null, enum: Activity })
  @Field(() => Activity, { nullable: true })
  activity?: Activity;
}

export const HistorySchema = SchemaFactory.createForClass(History);
