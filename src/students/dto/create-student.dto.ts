import { Field, InputType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@InputType()
export class CreateStudentDto {
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
  gender: Gender;

  @Field()
  date_of_brith: string;

  @Field()
  refresh_token: string;
}
