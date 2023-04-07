import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserId } from './decorator/user-id.decorator';
import { JwtGuard } from './guard/jwt.guard';
import { VerificationDto } from './dto/verification.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return { token: await this.authService.login(loginDto) };
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return { token: await this.authService.signup(signupDto) };
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('verify')
    async verify(
        @UserId() id: number,
        @Body() verificationDto: VerificationDto,
    ) {
        await this.authService.verify(id, verificationDto);
    }
}
