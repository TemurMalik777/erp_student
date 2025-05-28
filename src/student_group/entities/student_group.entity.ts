import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Groups } from '../../groups/entities/group.entity';

@ObjectType()
@Entity()
export class StudentGroup {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Student, (student) => student.studentGrId)
  @Field((type) => Student)
  student_id: Student;

  @ManyToOne(() => Groups, (group) => group.studentgroup)
  group: Groups;

  @Field()
  @Column()
  period: string;

  @Field()
  @Column()
  is_active: boolean;
}
