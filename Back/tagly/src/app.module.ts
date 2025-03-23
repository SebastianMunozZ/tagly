import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from 'node_modules/@nestjs/config';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,  // Hace las variables accesibles globalmente
    }),
    UsersModule, 
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
