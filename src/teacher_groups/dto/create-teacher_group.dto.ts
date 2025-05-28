import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTeacherGroupDto {
  @Field()
  id: number;

  @Field()
  teacherId: number;

  @Field((type)=>Int, {nullable: true})
  teachGroupId: number;
}
