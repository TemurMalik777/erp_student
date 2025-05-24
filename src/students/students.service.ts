import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.studentRepo.save(createStudentDto);
  }

  async findStudentByEmail(email: string) {
    const student = await this.studentRepo.findOne({ where: { email } });
    return student;
  }

  findAll() {
    return this.studentRepo.find();
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update({ id }, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepo.delete({ id });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.studentRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }

  async findStudentByRefresh(refresh_token: string) {
    const students = await this.studentRepo.find();

    for (const student of students) {
      const match = await bcrypt.compare(refresh_token, student.refresh_token);
      if (match) return student;
    }

    return null;
  }
}
