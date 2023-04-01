import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login(): string {
    return 'login function in AuthService';
  }

  signup(): string {
    return 'signup function in AuthService';
  }
}
