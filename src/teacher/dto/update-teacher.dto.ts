import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTeacherDto } from './create-teacher.dto';

// @InputType()
export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  // @Field()
  // first_name?: string;
  // @Field()
  // last_name?: string;
  // @Field()
  // phone?: string;
  // @Field()
  // email?: string;
  // @Field()
  // password?: string;
}
