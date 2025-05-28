import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
// import { Group } from "../../group/entities/group.entity";
// import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";
import { Media } from "../../media/entities/media.entity";
import { Groups } from "../../groups/entities/group.entity";
import { HomeworkSubmission } from "../../homework_submission/entities/homework_submission.entity";

@Entity()
export class Homework {

    @PrimaryGeneratedColumn()
    id:number


    @ManyToOne(()=>Teacher,(teacher)=>teacher.homework)
    teacher:Teacher


    @ManyToOne(()=>Groups,(group)=>group.homework)
    group:Groups


    @Column()
    description:string


    @Column()
    deadline:Date

    @Column()
    file_url:string
   

    @OneToMany(()=>HomeworkSubmission,(hsubmission)=>hsubmission.homework)
    hsubmission:HomeworkSubmission[]

   @OneToMany(()=>Media,(media)=>media.homework)
   media:Media[]
    
}