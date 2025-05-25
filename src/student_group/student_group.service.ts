import { Injectable } from '@nestjs/common';
import { CreateStudentGroupDto } from './dto/create-student_group.dto';
import { UpdateStudentGroupDto } from './dto/update-student_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student_group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentGroupService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly studentGroupRepo: Repository<StudentGroup>,
  ) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupRepo.save(createStudentGroupDto);
  }

  findAll() {
    return this.studentGroupRepo.find();
  }

  findOne(id: number) {
    return this.studentGroupRepo.findOneBy({ id });
  }

  update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    return this.studentGroupRepo.update({ id }, updateStudentGroupDto);
  }

  remove(id: number) {
    return this.studentGroupRepo.delete({ id });
  }
}
