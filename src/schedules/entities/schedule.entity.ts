import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  groupId: number;

  @Field()
  @Column()
  day_of_week: string;

  @Field()
  @Column()
  start_time: string;

  @Field()
  @Column()
  end_time: string;
}
