import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { Media } from '../media/entities/media.entity';
import { Groups } from '../groups/entities/group.entity';
import { HomeworkSubmission } from '../homework_submission/entities/homework_submission.entity';
import { GroupsModule } from '../groups/groups.module';
import { HomeworkController } from './homeworks.controller';
import { HomeworkService } from './homeworks.service';

@Module({
  imports:[TypeOrmModule.forFeature([
    Homework,Teacher,Groups,HomeworkSubmission,Media
  ]),GroupsModule,TeacherModule],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports:[HomeworkService]
})
export class HomeworkModule {}