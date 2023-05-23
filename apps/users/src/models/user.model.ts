import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Log } from './logs.model';

@ObjectType()
@Schema({versionKey:false})
export class User extends AbstractDocument {
  @Field()
  @Prop()
  name: string
  
  @Field()
  @Prop()
  createdAt: Date

  @Field()
  @Prop()
  historyLogs?: Log[]
}


export const UserSchema = SchemaFactory.createForClass(User)