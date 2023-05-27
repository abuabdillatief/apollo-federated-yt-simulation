import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@ObjectType('Video')
@Entity({name:"videos"})
export class Video {
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    @Field(() => ID)
    id: string

    @Column()
    @Field()
    title: string

    @Column()
    @Field(() => Int)
    duration: number

    @Column()
    @Field(() => Int, {defaultValue:0})
    totalPaused: number

    @Column()
    @Field(() => Int, {defaultValue:0})
    totalPlayed: number
  
    @Column({default:0})
    @Field(() => Int, {defaultValue:0})
    totalSkip: number
}