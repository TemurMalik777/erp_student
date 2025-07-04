import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeacherDto {
  @Field()
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;
}
