import { AbstractDocument } from '@app/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@ObjectType()
@Schema()
export class User extends AbstractDocument {
  @Prop()
  @Field(() => ID)
  id: string
  
  @Prop()
  @Field()
  name: string
  
  @Prop()
  @Field()
  createdAt: Date

}


export const UserSchema = SchemaFactory.createForClass(User)