import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherGroupsService } from './teacher_groups.service';
import { CreateTeacherGroupDto } from './dto/create-teacher_group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher_group.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { TeacherGroup } from './entities/teacher_group.entity';
import { GroupsResolver } from '../groups/groups.resolver';

@Controller('teacher-groups')
export class TeacherGroupsController {
  constructor(
    private readonly teacherGroupsService: TeacherGroupsService,
    private readonly groupResolver: GroupsResolver,
  ) {}

  @Mutation(() => TeacherGroup)
  async createTeacherGroup(
    @Args('createTeacherGroup') createTeacherGroupDto: CreateTeacherGroupDto,
    @Args('teachGroupId') teachGroupId: number,
  ) {
    const teachGroup = await this.groupResolver.findOneGroup(+teachGroupId);
    return this.teacherGroupsService.create(createTeacherGroupDto, teachGroup!);
  }

  @Query(() => [TeacherGroup])
  findAllTeacherGroup() {
    return this.teacherGroupsService.findAll();
  }

  @Query(() => TeacherGroup)
  findOneTeacherGroup(@Args('id', { type: () => ID }) id: number) {
    return this.teacherGroupsService.findOne(id);
  }

  @Mutation(() => TeacherGroup)
  updatefindOneTeacherGroup(
    @Args('id', { type: () => ID }) id: number,
    @Args('updatefindOneTeacherGroup')
    updateTeacherGroupDto: UpdateTeacherGroupDto,
  ) {
    return this.teacherGroupsService.update(id, updateTeacherGroupDto);
  }

  @Mutation(() => Number)
  removeTeacherGroup(@Args('id', { type: () => ID }) id: number) {
    return this.teacherGroupsService.remove(id);
  }
}
