import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentGroup } from '../../student_group/entities/student_group.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { HomeworkSubmission } from '../../homework_submission/entities/homework_submission.entity';
import { Grade } from '../../grades/entities/grade.entity';

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

  @Field({ defaultValue: Gender.MALE })
  @Column({ default: Gender.MALE })
  gender: Gender;

  @Field({ defaultValue: false })
  @Column({ default: false })
  date_of_brith: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  refresh_token: string;

  @OneToMany((type) => StudentGroup, (studentGr) => studentGr.student_id)
  @Field((type) => [StudentGroup])
  studentGrId: StudentGroup[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];

  @OneToMany(()=>HomeworkSubmission,(hsubmission)=>hsubmission.student)
  hsubmission:HomeworkSubmission[]

  @OneToMany(()=>Grade,(grade)=>grade.student)
  grade:Grade[]
}
