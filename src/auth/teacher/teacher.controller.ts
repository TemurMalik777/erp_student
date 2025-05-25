import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInDto } from '../dto/sing-in.dto';
import { AuthTeacherService } from './teacher.service';
import { CreateTeacherDto } from '../../teacher/dto/create-teacher.dto';

@Controller('teacher-auth')
export class TeacherController {
  constructor(private readonly authTeacher: AuthTeacherService) {}

  @Post('teacher-sign-up')
  async signUp(@Body() creatTeacherDto: CreateTeacherDto) {
    return this.authTeacher.signUpTeacher(creatTeacherDto);
  }

  @Post('admin-sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authTeacher.signInTeacher(signInDto, res);
  }

  @Post('teacher-sign-out')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authTeacher.signOutTeacher(req, res);
  }

  @Post('teacher-refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const adminId = req.body.adminId;
    const refresh_token = req.body.refresh_token;
    return this.authTeacher.refreshToken(adminId, refresh_token, res);
  }
}
