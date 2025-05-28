import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';
import { HomeworkSubmission } from './entities/homework_submission.entity';
import { HomeworkService } from '../homeworks/homeworks.service';
import { CreateHomeworkSubmissionDto } from './dto/create-homework_submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework_submission.dto';

@Injectable()
export class HomeworkSubmissionsService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>,
    private readonly homeworkService: HomeworkService,
    private readonly studentService: StudentsService,
  ) {}
  async create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    const { studentId, homeworkId, ...otherDto } = createHomeworkSubmissionDto;
    const student = await this.studentService.findOne(studentId);
    if (!student) {
      throw new BadRequestException('Student Not Found');
    }
    const homework = await this.studentService.findOne(homeworkId);
    if (!homework) {
      throw new BadRequestException('Homework Not Found');
    }
    const newHomeworkSubmission = this.homeworkSubmissionRepo.create({
      student,
      homework,
      ...otherDto,
    });
    return this.homeworkSubmissionRepo.save(newHomeworkSubmission);
  }

  findAll() {
    return this.homeworkSubmissionRepo.find({
      relations: ['hsubmission', 'student'],
    });
  }

  findOne(id: number) {
    return this.homeworkSubmissionRepo.findOne({
      where: { id },
      relations: ['hsubmission', 'student'],
    });
  }

  update(id: number, updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto) {
    return this.homeworkSubmissionRepo.preload({
      id,
      ...updateHomeworkSubmissionDto,
    });
  }

  remove(id: number) {
    return this.homeworkSubmissionRepo.delete({ id });
  }
}
