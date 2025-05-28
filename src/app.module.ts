import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from 'typeorm';
import { Teacher } from './teacher/entities/teacher.entity';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { AttendancesModule } from './attendances/attendances.module';
import { SchedulesModule } from './schedules/schedules.module';
import { StudentGroupModule } from './student_group/student_group.module';
import { TeacherGroupsModule } from './teacher_groups/teacher_groups.module';
import { GradesModule } from './grades/grades.module';
import { MediaModule } from './media/media.module';
import { ExamResultsModule } from './exam_results/exam_results.module';
import { ExamsModule } from './exams/exams.module';
import { ExamTeacherModule } from './exam_teacher/exam_teacher.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { HomeworkSubmissionsModule } from './homework_submission/homework_submission.module';
import { HomeworkModule } from './homeworks/homeworks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PG_HOST'),
        port: config.get<number>('PG_PORT'),
        username: config.get<string>('PG_USER'),
        password: config.get<string>('PG_PASSWORD'),
        database: config.get<string>('PG_DB'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [Admin, Teacher],
      }),
    }),
    AdminModule,
    TeacherModule,
    AuthModule,
    StudentsModule,
    CoursesModule,
    GroupsModule,
    AttendancesModule,
    SchedulesModule,
    StudentGroupModule,
    TeacherGroupsModule,
    GradesModule,
    HomeworkSubmissionsModule,
    MediaModule,
    HomeworkModule,
    ExamResultsModule,
    ExamsModule,
    ExamTeacherModule,
    PaymentsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
