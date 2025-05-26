import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from '../../groups/entities/group.entity';

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  lessons_in_a_week: number;

  @Field()
  @Column()
  lessons_duration: number;

  @OneToMany((type) => Groups, (group) => group.course)
  @Field((type) => [Groups])
  groups: Groups[];
}
