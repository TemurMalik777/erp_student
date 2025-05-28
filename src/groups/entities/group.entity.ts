import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { TeacherGroup } from '../../teacher_groups/entities/teacher_group.entity';
import { Homework } from '../../homeworks/entities/homework.entity';
import { StudentGroup } from '../../student_group/entities/student_group.entity';

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

  @OneToMany((type) => Schedule, (scheduls) => scheduls.groups)
  @Field((type) => [Schedule])
  groupId: Schedule[];

  @OneToMany((type) => TeacherGroup, (teacherGroup) => teacherGroup.teachGpId)
  @Field((type) => [TeacherGroup])
  group: TeacherGroup[];

  @OneToMany(() => Homework, (homework) => homework.group)
  homework:Homework[]

  @OneToMany(() => StudentGroup, (studentgroup) => studentgroup.group)
  studentgroup: StudentGroup[];
}
