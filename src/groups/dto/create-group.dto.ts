import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  courseId: number;

  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  status: boolean;
}
