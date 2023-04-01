import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login(loginDto: LoginDto): string {
    return 'login function in AuthService';
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await argon2.hash(signupDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          phonenumber: signupDto.phoneNumber,
          name: signupDto.email,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error
    }
  }
}
