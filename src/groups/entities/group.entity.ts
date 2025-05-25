import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  courseId: number;

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
