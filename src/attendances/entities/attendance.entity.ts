import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Student } from '../../students/entities/student.entity';

@ObjectType()
@Entity()
export class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student;

  @ManyToMany((type) => Schedule, (scheduleId) => scheduleId.attends)
  @Field((type) => Schedule)
  scheduleId: Schedule;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  status: boolean;
}
