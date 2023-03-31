import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @Post('signup')
  signup(): string {
    return this.authService.signup();
  }
}
