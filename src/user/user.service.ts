import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    async profile(id: number) {
        return await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            select: {
                email: true,
                name: true,
                phonenumber: true
            }
        });
    }
}
