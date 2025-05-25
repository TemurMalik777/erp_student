import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAttendanceDto {
  @Field()
  studnetId?: number;

  @Field()
  scheduleId?: number;

  @Field()
  date?: string;

  @Field()
  status?: boolean;
}
