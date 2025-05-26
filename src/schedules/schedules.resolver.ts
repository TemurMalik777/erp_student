import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Schedule } from './entities/schedule.entity';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Query(() => [Schedule])
  findAllSchedule() {
    return this.schedulesService.findAll();
  }

  @Query(() => Schedule)
  findOneSchedule(@Args('id', { type: () => ID }) id: number) {
    return this.schedulesService.findOne(id);
  }

  @Mutation(() => Schedule)
  updateSchedule(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateSchedule') updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Mutation(() => Number)
  removeSchedule(@Args('id', { type: () => ID }) id: number) {
    return this.schedulesService.remove(id);
  }
}
