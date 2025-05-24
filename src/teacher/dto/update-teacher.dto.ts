import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherDto {
  @Field()
  first_name?: string;

  @Field()
  last_name?: string;

  @Field()
  phone?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;
}
