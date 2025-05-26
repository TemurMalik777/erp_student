import { Field, InputType, Int } from '@nestjs/graphql';
import { Course } from '../../courses/entities/course.entity';

@InputType()
export class CreateGroupDto {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field((type) => Int, { nullable: true })
  course: Course;

  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  status: boolean;
}
