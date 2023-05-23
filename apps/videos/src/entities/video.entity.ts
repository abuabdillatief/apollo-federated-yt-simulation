import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
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