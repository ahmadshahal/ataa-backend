import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    login(loginDto: LoginDto): string;
    signup(signupDto: SignupDto): Promise<User>;
}
