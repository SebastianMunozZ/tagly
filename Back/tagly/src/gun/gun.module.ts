import { Module } from '@nestjs/common';
import { GunService } from './gun.service';
import { GunController } from './gun.controller';

@Module({
  controllers: [GunController],
  providers: [GunService],
})
export class GunModule {}
