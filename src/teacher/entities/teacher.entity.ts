import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { TeacherGroup } from '../../teacher_groups/entities/teacher_group.entity';
import { Homework } from '../../homeworks/entities/homework.entity';
import { Grade } from '../../grades/entities/grade.entity';

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

  @OneToMany((type) => TeacherGroup, (tchGroup) => tchGroup.tchGroupId)
  @Field((type) => [TeacherGroup])
  teachers: TeacherGroup[];

  @OneToMany(() => Homework, (homework) => homework.teacher)
  homework: Homework[];

  @OneToMany(() => Grade, (grade) => grade.teacher)
  grade: Grade[];
}
