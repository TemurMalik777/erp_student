import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from '../../teacher/dto/create-teacher.dto';

// @InputType()
export class UpdateTeacherGroupDto extends PartialType(CreateTeacherDto) {
  // @Field()
  // teacherId?: number;

  // @Field()
  // groupId?: number;
}
