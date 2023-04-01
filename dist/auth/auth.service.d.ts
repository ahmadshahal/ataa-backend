import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prismaService;
    private configService;
    private jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<string>;
    signup(signupDto: SignupDto): Promise<string>;
    signToken(userId: number, email: string): Promise<string>;
}
