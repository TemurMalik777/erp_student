import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from './entities/group.entity';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private readonly groupRepo: Repository<Groups>,
  ) {}

  async create(createGroupDto: CreateGroupDto, courseId: Course) {
    return this.groupRepo.save({ ...createGroupDto, courseId });
  }

  findAll() {
    return this.groupRepo.find();
  }

  findOne(id: number) {
    return this.groupRepo.findOneBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    // const { courseId, ...rest } = updateGroupDto;
    // const group = await this.groupRepo.preload({
    //   id,
    //   ...rest,
    //   ...(courseId !== undefined ? { courseId: { id: courseId } } : {}),
    // });
    // if (!group) {
    //   throw new NotFoundException('Group not found', `${id}`);
    // }
    // return this.groupRepo.save(group);
  }

  remove(id: number) {
    return this.groupRepo.delete({ id });
  }
}
