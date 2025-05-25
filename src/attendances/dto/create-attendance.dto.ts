import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceDto {
  @Field()
  studnetId: number;

  @Field()
  scheduleId: number;

  @Field()
  date: string;

  @Field()
  status: boolean;
}
