import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
    login(): string;
    signup(): string;
}
