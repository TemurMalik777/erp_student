import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './admin/auth.controller';
import { TeacherController } from './teacher/teacher.controller';
import { AuthTeacherService } from './teacher/teacher.service';
import { StudentController } from './student/student.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentsModule } from '../students/students.module';
import { AuthStudentService } from './student/student.service';

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, TeacherModule, StudentsModule],
  controllers: [AuthAdminController, TeacherController, StudentController],
  providers: [AdminAuthService, AuthTeacherService, AuthStudentService],
})
export class AuthModule {}
