import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      const users = await this.usersService.getUsers();
      return users;
    } catch (error) {
      return { error };
    }
  }

  @Post()
  async createUser(@Body() userData: { name: string; surname: string; username: string; email: string; password:string }) {
    try {
      const message = await this.usersService.createUser(userData);
      return { message };
    } catch (error) {
      return { error };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const message = await this.usersService.deleteUser(userId);
      return { message };
    } catch (error) {
      return { error };
    }
  }
}
