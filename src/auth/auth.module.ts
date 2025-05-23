import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './admin/auth.controller';
import { TeacherController } from './teacher/teacher.controller';
import { AuthTeacherService } from './teacher/teacher.service';

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule],
  controllers: [AuthAdminController, TeacherController],
  providers: [AdminAuthService, AuthTeacherService],
})
export class AuthModule {}
