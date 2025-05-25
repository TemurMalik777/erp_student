import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentGroupDto {
  @Field()
  studentId: number;

  @Field()
  groupId: number;

  @Field()
  period: string;

  @Field()
  is_active: boolean;
}
