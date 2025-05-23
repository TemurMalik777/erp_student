import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...otherData } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException('Parollar mos emas');
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminRepo.save({
      ...otherData,
      hashed_password,
    });
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }
    return admin;
  }

  async findAdminByEmail(email: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    return admin;
  }

  async findAdminByRefresh(refresh_token: string) {
    const admins = await this.adminRepo.find();

    for (const admin of admins) {
      const match = await bcrypt.compare(refresh_token, admin.refresh_token);
      if (match) return admin;
    }

    return null;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const update = await this.adminRepo.update(id, updateAdminDto);
    if (!update) {
      throw new NotFoundException('Admin topilmadi');
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.adminRepo.delete(id);
    if (!delet) {
      throw new NotFoundException('Admin topilmadi');
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
  async updateRefreshToken(id: number, refresh_token: string) {
    await this.adminRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }
}
