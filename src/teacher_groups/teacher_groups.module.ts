import { Module } from '@nestjs/common';
import { TeacherGroupsService } from './teacher_groups.service';
import { TeacherGroupsController } from './teacher_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherGroup])],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService],
  exports: [TeacherGroupsService]
})
export class TeacherGroupsModule {}
