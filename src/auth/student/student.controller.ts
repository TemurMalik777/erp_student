import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthStudentService } from './student.service';
import { CreateStudentDto } from '../../students/dto/create-student.dto';
import { SignInDto } from '../dto/sing-in.dto';

@Controller('student-auth')
export class StudentController {
    constructor(private readonly authTeacher: AuthStudentService) {}
    
      @Post('student-sign-up')
      async signUp(@Body() createStudentDto: CreateStudentDto) {
        return this.authTeacher.signUpTeacher(createStudentDto);
      }
    
      @Post('student-sign-in')
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
        return this.authTeacher.signOutStuden(req, res);
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
