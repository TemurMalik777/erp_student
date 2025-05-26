import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeacherGroupDto {
  @Field()
  id: number;

  @Field()
  teacherId: number;

  @Field()
  groupId: number;
}
