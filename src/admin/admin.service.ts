import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepo.create(createAdminDto as Partial<Admin>);
    return this.adminRepo.save(admin);
  }

  // async create(createAdminDto: CreateAdminDto) {
  //   const newAdmin = this.adminRepo.save(createAdminDto);
  //   return this.adminRepo.save(newAdmin);
  // }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<Admin | null> {
    return this.adminRepo.findOneBy(<any>{ id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<void> {
    await this.adminRepo.update(
      id,
      updateAdminDto as QueryDeepPartialEntity<Admin>,
    );
  }

  async remove(id: number): Promise<{ message: string }> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new Error(`Admin with ID ${id} not found`);
    }
    await this.adminRepo.remove(admin);
    return { message: `Admin with ID ${id} has been removed` };
  }
}
