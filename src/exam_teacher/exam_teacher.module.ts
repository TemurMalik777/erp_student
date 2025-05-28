import { Module } from '@nestjs/common';
import { ExamTeacherService } from './exam_teacher.service';
import { ExamTeacherController } from './exam_teacher.controller';

@Module({
  controllers: [ExamTeacherController],
  providers: [ExamTeacherService],
})
export class ExamTeacherModule {}
