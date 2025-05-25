import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScheduleDto {
  @Field()
  id: number;

  @Field()
  groupId: number;

  @Field()
  day_of_week: string;

  @Field()
  start_time: string;

  @Field()
  end_time: string;
}
