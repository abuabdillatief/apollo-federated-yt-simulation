import { AbstractDocument } from '@app/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends AbstractDocument {
  @PrimaryColumn()
  @Field(() => ID)
  id: string
  
  @Field()
  @Column()
  name: string
  
  @Field()
  @Column()
  createdAt: Date

}


export const UserSchema = SchemaFactory.createForClass(User)