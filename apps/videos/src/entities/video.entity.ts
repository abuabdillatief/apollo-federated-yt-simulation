import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Video {
    @Field(() => Int)
    id: number
    @Field(() => Int)
    duration: number
    @Field(() => Int)
    totalClick: number
    @Field(() => Int)
    totalPlayed: number

}