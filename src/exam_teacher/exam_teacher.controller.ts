import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamTeacherService } from './exam_teacher.service';
import { CreateExamTeacherDto } from './dto/create-exam_teacher.dto';
import { UpdateExamTeacherDto } from './dto/update-exam_teacher.dto';

@Controller('exam-teacher')
export class ExamTeacherController {
  constructor(private readonly examTeacherService: ExamTeacherService) {}

  @Post()
  create(@Body() createExamTeacherDto: CreateExamTeacherDto) {
    return this.examTeacherService.create(createExamTeacherDto);
  }

  @Get()
  findAll() {
    return this.examTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamTeacherDto: UpdateExamTeacherDto) {
    return this.examTeacherService.update(+id, updateExamTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examTeacherService.remove(+id);
  }
}
