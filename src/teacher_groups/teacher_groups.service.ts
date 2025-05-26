import { Injectable } from '@nestjs/common';
import { CreateTeacherGroupDto } from './dto/create-teacher_group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher_group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private readonly teachGroupRepo: Repository<TeacherGroup>,
  ) {}

  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    return this.teachGroupRepo.save(createTeacherGroupDto);
  }

  findAll() {
    return this.teachGroupRepo.find();
  }

  findOne(id: number) {
    return this.teachGroupRepo.findOneBy({ id });
  }

  update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    return this.teachGroupRepo.update({ id }, updateTeacherGroupDto);
  }

  remove(id: number) {
    return this.teachGroupRepo.delete({ id });
  }
}
