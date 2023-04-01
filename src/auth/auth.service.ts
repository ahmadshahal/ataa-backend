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

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const passwordsMatch = await argon2.verify(
      user.password,
      loginDto.password,
    );
    if (!passwordsMatch) {
      throw new ForbiddenException('Wrong Password');
    }
    return user;
  }

  async signup(signupDto: SignupDto): Promise<User> {
    const hashedPassword = await argon2.hash(signupDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          phonenumber: signupDto.phoneNumber,
          name: signupDto.name,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }
}
