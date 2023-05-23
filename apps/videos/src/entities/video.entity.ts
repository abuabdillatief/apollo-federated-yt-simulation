import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@ObjectType('Video')
@Entity()
export class Video {
    @ObjectIdColumn()
    _id:string

    @PrimaryColumn()
    @Field(() => ID)
    id: string

    @Column()
    @Field(() => Int)
    duration: number
    
    @Column()
    @Field(() => Int)
    totalClick: number
    
    @Column()
    @Field(() => Int)
    totalPlayed: number
}