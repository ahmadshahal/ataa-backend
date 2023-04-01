import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login(loginDto: LoginDto): string {
    return 'login function in AuthService';
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await argon2.hash(signupDto.password);
    const user = await this.prismaService.user.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
        phonenumber: signupDto.phoneNumber,
        name: signupDto.email,
      },
    });
    return user;
  }
}
