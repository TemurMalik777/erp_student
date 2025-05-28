import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { Groups } from '../../groups/entities/group.entity';

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type)=>Groups, (groups)=>groups.groupId)
  @Field((type)=>Groups)
  groups: Groups;

  @Field()
  @Column()
  day_of_week: string;

  @Field()
  @Column()
  start_time: string;

  @Field()
  @Column()
  end_time: string;

  @OneToMany((type)=>Attendance, (attend)=>attend.scheduleId)
  @Field((type)=>[Attendance])
  attends: Attendance[]
}
