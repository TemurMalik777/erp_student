import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { StudentsModule } from '../students/students.module';
import { Grade } from '../grades/entities/grade.entity';
import { HomeworkSubmission } from './entities/homework_submission.entity';
import { Homework } from '../homeworks/entities/homework.entity';
import { HomeworkModule } from '../homeworks/homeworks.module';
import { HomeworkSubmissionsController } from './homework_submission.controller';
import { HomeworkSubmissionsService } from './homework_submission.service';

@Module({
  imports:[TypeOrmModule.forFeature([
    HomeworkSubmission,Homework,Student,Grade
  ]),HomeworkModule,StudentsModule],
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
  exports:[HomeworkSubmissionsService]
})
export class HomeworkSubmissionsModule {}