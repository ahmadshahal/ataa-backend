import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login(loginDto: LoginDto): string {
    return 'login function in AuthService';
  }

  signup(signupDto: SignupDto): string {
    return 'signup function in AuthService';
  }
}
