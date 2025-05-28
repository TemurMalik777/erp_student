import { Injectable } from '@nestjs/common';
import { CreateExamTeacherDto } from './dto/create-exam_teacher.dto';
import { UpdateExamTeacherDto } from './dto/update-exam_teacher.dto';

@Injectable()
export class ExamTeacherService {
  create(createExamTeacherDto: CreateExamTeacherDto) {
    return 'This action adds a new examTeacher';
  }

  findAll() {
    return `This action returns all examTeacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examTeacher`;
  }

  update(id: number, updateExamTeacherDto: UpdateExamTeacherDto) {
    return `This action updates a #${id} examTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} examTeacher`;
  }
}
