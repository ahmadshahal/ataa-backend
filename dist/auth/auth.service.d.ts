import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    login(loginDto: LoginDto): string;
    signup(): string;
}
