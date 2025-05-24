import { Field, InputType } from '@nestjs/graphql';
import { Gender } from './create-student.dto';

@InputType()
export class UpdateStudentDto {
  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  date_of_brith?: string;
}
