import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Attendance {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  studnetId: number;

  @Field()
  @Column()
  scheduleId: number;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  status: boolean;
}
