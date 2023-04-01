import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return { token: await this.authService.login(loginDto) };
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return { token: await this.authService.signup(signupDto) };
    }
}
