import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  is_active: boolean;

  @Field({ defaultValue: Gender })
  @Column({ default: Gender })
  gender: Gender;

  @Field({ defaultValue: false })
  @Column({ default: false })
  date_of_brith: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  refresh_token: string;
}
