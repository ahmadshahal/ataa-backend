import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login(loginDto: LoginDto): string {
    return 'login function in AuthService';
  }

  signup(): string {
    return 'signup function in AuthService';
  }
}
