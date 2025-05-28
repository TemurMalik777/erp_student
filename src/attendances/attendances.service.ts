import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../schedules/entities/schedule.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto, scheduleId: Schedule) {
    const newSchedule = this.attendanceRepo.create({
      ...createAttendanceDto,
      scheduleId,
    });
    return this.attendanceRepo.save(newSchedule);
  }
  findAll() {
    return this.attendanceRepo.find();
  }

  findOne(id: number) {
    return this.attendanceRepo.findOneBy({ id });
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepo.update({ id }, updateAttendanceDto);
  }

  remove(id: number) {
    return this.attendanceRepo.delete({ id });
  }
}
