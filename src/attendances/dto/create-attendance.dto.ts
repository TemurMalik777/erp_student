import { Field, InputType, Int } from '@nestjs/graphql';
import { Schedule } from '../../schedules/entities/schedule.entity';

@InputType()
export class CreateAttendanceDto {
  @Field()
  studnetId: number;

  @Field((type) => Int, { nullable: true })
  scheduleId: Schedule;

  @Field()
  date: string;

  @Field()
  status: boolean;
}
