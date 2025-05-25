import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  duration: number;

  @Field()
  lessons_in_a_week: number;

  @Field()
  lessons_duration: number;
}
