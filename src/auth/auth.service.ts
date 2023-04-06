import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { VerificationDto } from './dto/verification.dto';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('Credentials Incorrect');
        }
        if (!user.verified) {
            throw new ForbiddenException('Account Verification Required');
        }
        const passwordsMatch = await argon.verify(
            user.password,
            loginDto.password,
        );
        if (!passwordsMatch) {
            throw new ForbiddenException('Wrong Password');
        }
        return await this.signToken(user.id, user.email);
    }

    async signup(signupDto: SignupDto): Promise<string> {
        const hashedPassword = await argon.hash(signupDto.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: signupDto.email,
                    password: hashedPassword,
                    phonenumber: signupDto.phoneNumber,
                    name: signupDto.name,
                },
            });
            return await this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken');
                }
            }
            throw error;
        }
    }

    async verify(verificationDto: VerificationDto) {
        try {
            await this.prismaService.user.update({
                data: {
                    verified: true,
                },
                where: {
                    email: verificationDto.email,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2001') {
                    throw new ForbiddenException('Credentials Incorrect');
                }
                if (error.code === 'P2025') {
                    throw new ForbiddenException('Credentials Incorrect');
                }
            }
            throw error;
        }
    }

    private signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email,
        };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '60m',
        });
    }
}
