import {
  Controller
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';

@Controller('students')
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => Student)
  async createStudent(
    @Args('createStudent') createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create(createStudentDto);
  }

  @Query(() => [Student])
  findAllStudent() {
    return this.studentsService.findAll();
  }

  @Query(() => Student)
  findOneStudent(@Args('id', { type: () => ID }) id: number) {
    return this.studentsService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateStudent') updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Mutation(() => Number)
  removeStudent(@Args('id', { type: () => ID }) id: number) {
    return this.studentsService.remove(id);
  }
}
