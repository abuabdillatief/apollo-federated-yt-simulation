
import { SortBy } from '@app/common';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetVideosInput {
    @Field(() => SortBy, {nullable:true, defaultValue: SortBy.TotalPlayed})
    sortBy: SortBy
}
