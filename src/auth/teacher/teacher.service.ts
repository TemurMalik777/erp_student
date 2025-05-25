import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto/sing-in.dto';

import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { TeacherService } from '../../teacher/teacher.service';
import { CreateTeacherDto } from '../../teacher/dto/create-teacher.dto';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Injectable()
export class AuthTeacherService {
  constructor(
    private readonly teacherService: TeacherService,
    readonly jwtService: JwtService,
  ) {}

  async generateToken(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      is_active: teacher.is_active,
      is_creator: teacher.is_creater,
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
  async signUpTeacher(createTeacherDto: CreateTeacherDto) {
    const candidate = await this.teacherService.findTeacherByEmail(
      createTeacherDto.email,
    );
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newTeacher = await this.teacherService.create(createTeacherDto);
    return { message: "Foydalanuvchi qo'shildi", teacherId: newTeacher.id };
  }

  async signInTeacher(singInDto: SignInDto, res: Response) {
    const teacher = await this.teacherService.findTeacherByEmail(
      singInDto.email,
    );

    if (!teacher) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      teacher.hashed_password,
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor notug'ri");
    }
    const tokens = await this.generateToken(teacher);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      teacher.refresh_token = hashed_refresh_token;
      await this.teacherService.update(teacher.id, teacher);
    } catch (error) {
      console.log('Token da xatolik !?!');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutTeacher(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const teacher =
      await this.teacherService.findTeacherByRefresh(refresh_token);

    if (!teacher) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    teacher.refresh_token = '';
    await this.teacherService.update(teacher.id, teacher);

    res.clearCookie('refresh_token');

    return { message: "Siz endi yo'q siz !?" };
  }

  async refreshToken(teacherId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (teacherId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const teacher = await this.teacherService.findOne(teacherId);

    if (!teacher || !teacher.refresh_token) {
      throw new NotFoundException('staff not found');
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      teacher.refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } = await this.generateToken(teacher);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.teacherService.updateRefreshToken(
      teacher.id,
      hashed_refresh_token,
    );

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'teacher refreshed',
      patientId: teacher.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
