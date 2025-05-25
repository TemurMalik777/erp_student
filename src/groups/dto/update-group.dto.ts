import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  courseId?: number;

  @Field()
  start_date?: string;

  @Field()
  end_date?: string;

  @Field()
  status?: boolean;
}
