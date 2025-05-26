import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentGroupService } from './student_group.service';
import { CreateStudentGroupDto } from './dto/create-student_group.dto';
import { UpdateStudentGroupDto } from './dto/update-student_group.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { StudentGroup } from './entities/student_group.entity';

@Controller('student-group')
export class StudentGroupController {
  constructor(private readonly studentGroupService: StudentGroupService) {}

  @Mutation(() => StudentGroup)
  createStudentGroup(@Body() createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupService.create(createStudentGroupDto);
  }

  @Query(() => [StudentGroup])
  findAllStudentGroup() {
    return this.studentGroupService.findAll();
  }

  @Query(() => StudentGroup)
  findOneStudentGroup(@Args('id', { type: () => ID }) id: number) {
    return this.studentGroupService.findOne(id);
  }

  @Mutation(() => StudentGroup)
  updateStudentGroup(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateStudentGroup') updateStudentGroupDto: UpdateStudentGroupDto,
  ) {
    return this.studentGroupService.update(id, updateStudentGroupDto);
  }

  @Mutation(':id')
  removeStudentGroup(@Args('id', { type: () => ID }) id: number) {
    return this.studentGroupService.remove(id);
  }
}
