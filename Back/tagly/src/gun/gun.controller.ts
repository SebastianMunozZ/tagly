import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { GunService } from './gun.service';

@Controller('gun')
export class GunController {
  constructor(private readonly gunService: GunService) {}

  @Get('users')
  async getUsers() {
    try {
      const users = await this.gunService.getUsers();
      return users;
    } catch (error) {
      return { message: error };
    }
  }

  @Post('users')
  async createUser(@Body() userData: { username: string; email: string }) {
    try {
      const result = await this.gunService.saveUser(userData);
      return result;
    } catch (error) {
      return { message: error };
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const message = await this.gunService.deleteUser(userId);
      return { message };
    } catch (error) {
      return { error };
    }
  }
}
