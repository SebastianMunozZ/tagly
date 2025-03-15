import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GunService } from './gun/gun.service';
import { GunController } from './gun/gun.controller';
import { GunModule } from './gun/gun.module';

@Module({
  imports: [GunModule],
  controllers: [AppController, GunController],
  providers: [AppService, GunService],
})
export class AppModule {}
