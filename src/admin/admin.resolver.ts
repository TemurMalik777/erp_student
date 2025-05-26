import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Admin } from 'typeorm';

@Controller('admin')
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  async createAdmin(@Args('createAdmin') createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin])
  findAllAdmin() {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args('id', { type: () => ID }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args('id', { type: () => ID }) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Mutation(() => Number)
  removeAdmin(@Args('id', { type: () => ID }) id: number) {
    return this.adminService.remove(id);
  }
}
