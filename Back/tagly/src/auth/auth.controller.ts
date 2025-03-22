import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { tag: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.tag,
      credentials.password,
    );

    if (!user) {
      return { message: 'Credenciales inválidas' };
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtected(@Request() req) {
    return { message: `Bienvenido, ${req.user.username}!` };
  }
}
