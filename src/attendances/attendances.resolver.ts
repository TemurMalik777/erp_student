import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Attendance } from './entities/attendance.entity';
import { SchedulesReslover } from '../schedules/schedules.resolver';

@Controller('attendances')
export class AttendancesResolver {
  constructor(
    private readonly attendancesService: AttendancesService,
    private readonly scheduleReslover: SchedulesReslover,
  ) {}

  @Mutation(() => Attendance)
  async createAttendance(
    @Args('createAttendance') createAttendanceDto: CreateAttendanceDto,
    @Args('scheduleId') scheduleId: number,
  ) {
    const schedule = await this.scheduleReslover.findOneSchedule(+scheduleId);
    return this.attendancesService.create(createAttendanceDto, schedule!);
  }

  @Query(() => [Attendance])
  findAllAttendance() {
    return this.attendancesService.findAll();
  }

  @Query(() => Attendance)
  findOneAttendance(@Args('id', { type: () => ID }) id: number) {
    return this.attendancesService.findOne(id);
  }

  @Mutation(() => Attendance)
  updateAttendance(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAttendance') updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendancesService.update(id, updateAttendanceDto);
  }

  @Mutation(() => Number)
  removeAttendance(@Args('id', { type: () => ID }) id: number) {
    return this.attendancesService.remove(id);
  }
}
