import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';

// @InputType()
export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  // @Field()
  // studnetId?: number;
  // @Field()
  // scheduleId?: number;
  // @Field()
  // date?: string;
  // @Field()
  // status?: boolean;
}
