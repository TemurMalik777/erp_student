import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '../../students/entities/student.entity';
import { CreateStudentDto } from '../../students/dto/create-student.dto';
import { SignInDto } from '../dto/sing-in.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { StudentsService } from '../../students/students.service';

@Injectable()
export class AuthStudentService {
  constructor(
    private readonly studentService: StudentsService,
    readonly jwtService: JwtService,
  ) {}

  async generateToken(student: Student) {
    const payload = {
      id: student.id,
      is_active: student.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUpTeacher(createStudentDto: CreateStudentDto) {
    const student = await this.studentService.findStudentByEmail(
      createStudentDto.email,
    );
    if (student) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newStudent = (await this.studentService.create(
      createStudentDto,
    )) as Student;
    return { message: "Foydalanuvchi qo'shildi", teacherId: newStudent.id };
  }
  async signInTeacher(singInDto: SignInDto, res: Response) {
    const student = await this.studentService.findStudentByEmail(
      singInDto.email,
    );

    if (!student) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      student.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor notug'ri");
    }
    const tokens = await this.generateToken(student);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      student.refresh_token = hashed_refresh_token;
      await this.studentService.update(student.id, student);
    } catch (error) {
      console.log('Token da xatolik !?!');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutStuden(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const student =
      await this.studentService.findStudentByRefresh(refresh_token);

    if (!student) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    student.refresh_token = '';
    await this.studentService.update(student.id, student);

    res.clearCookie('refresh_token');

    return { message: "Siz endi yo'q siz !?" };
  }

  async refreshToken(studentId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (studentId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const student = await this.studentService.findOne(studentId);

    if (!student || !student.refresh_token) {
      throw new NotFoundException('staff not found');
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      student.refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } = await this.generateToken(student);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.studentService.updateRefreshToken(
      student.id,
      hashed_refresh_token,
    );

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'Staff refreshed',
      patientId: student.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
