import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): string {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signup(): string {
    return this.authService.signup();
  }
}
