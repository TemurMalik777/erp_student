import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
@Entity()
export class Groups {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany((type) => Course, (course) => course.groups)
  @Field((type) => Course)
  course: Course;

  @Field()
  @Column()
  start_date: string;

  @Field()
  @Column()
  end_date: string;

  @Field()
  @Column()
  status: boolean;
}
