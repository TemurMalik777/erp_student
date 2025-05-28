import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from '../../groups/entities/group.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

@ObjectType()
@Entity()
export class TeacherGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Teacher, (tchGroupId) => tchGroupId.teachers)
  @Field((type) => Teacher)
  tchGroupId: Teacher;

  @ManyToMany((type) => Groups, (teachGpId) => teachGpId.group)
  @Field((type) => Groups)
  teachGpId: Groups;
}
