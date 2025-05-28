import { PartialType } from '@nestjs/mapped-types';
import { CreateExamTeacherDto } from './create-exam_teacher.dto';

export class UpdateExamTeacherDto extends PartialType(CreateExamTeacherDto) {}
