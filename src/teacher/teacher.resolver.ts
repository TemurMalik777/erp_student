import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Teacher } from './entities/teacher.entity';

@Controller('teacher')
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  async createTeacher(
    @Args('createTeacher') createTeacherDto: CreateTeacherDto,
  ) {
    return this.teacherService.create(createTeacherDto);
  }

  @Query(() => [Teacher])
  findAllTeacher() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher)
  findOneTeacher(@Args('id', { type: () => ID }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Patch(':id')
  updateTeacher(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTeacher') updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Mutation(() => Number)
  remove(@Args('id', { type: () => ID }) id: number) {
    return this.teacherService.remove(id);
  }
}
