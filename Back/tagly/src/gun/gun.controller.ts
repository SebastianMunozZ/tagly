import { Controller, Get } from '@nestjs/common';
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
}
