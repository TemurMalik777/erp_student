import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepo.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update({ id }, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepo.delete({ id });
  }
}
