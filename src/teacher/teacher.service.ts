import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  
  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepo.save(createTeacherDto);
  }

  async findTeacherByEmail(email: string) {
    const teacher = await this.teacherRepo.findOne({ where: { email } });
    return teacher;
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  async findTeacherByRefresh(refresh_token: string) {
    const teachers = await this.teacherRepo.find();

    for (const teacher of teachers) {
      const match = await bcrypt.compare(refresh_token, teacher.refresh_token);
      if (match) return teacher;
    }

    return null;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update({ id }, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepo.delete({ id });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.teacherRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }
}
