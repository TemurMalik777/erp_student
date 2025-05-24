import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  TEACHER = 'teacher',
  DIRECTOR = 'director',
}

@ObjectType()
@Entity()
export class Teacher {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
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
  hashed_password: string;

  @Field()
  @Column({ default: Role })
  role: string;

  @Field()
  @Column({ default: false })
  is_creater: boolean;

  @Field()
  @Column({ default: false })
  is_active: boolean;

  @Field()
  @Column({ nullable: true })
  refresh_token: string;
}
