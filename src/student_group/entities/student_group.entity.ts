import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class StudentGroup {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    studentId: number

    @Field()
    @Column()
    groupId: number
    
    @Field()
    @Column()
    period: string

    @Field()
    @Column()
    is_active: boolean
}
