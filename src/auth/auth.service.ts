import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { VerificationDto } from './dto/verification.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService,
        private mailerService: MailerService,
    ) {}

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });
        if (!user) {
            throw new BadRequestException('Credentials Incorrect');
        }
        const passwordsMatch = await argon.verify(
            user.password,
            loginDto.password,
        );
        if (!passwordsMatch) {
            throw new BadRequestException('Wrong Password');
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
            const verificationCode = this.generateVerificationCode();
            this.saveAndSendCode(user.id, user.email, verificationCode);
            return await this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Credentials Taken');
                }
            }
            throw error;
        }
    }

    async verify(id: number, verificationDto: VerificationDto) {
        const code = verificationDto.code;
        try {
            const count = await this.prismaService.verificationCode.count({
                where: {
                    userId: id,
                    code: code,
                },
            });
            if (count === 0) {
                throw new BadRequestException('Wrong Verification Code');
            }
            await this.prismaService.user.update({
                data: {
                    verified: true,
                },
                where: {
                    id: id,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new BadRequestException('Credentials Incorrect');
                }
            }
            throw error;
        }
    }

    async sendCodeAgain(id: number) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new BadRequestException('Credentials Incorrect');
        }
        const verificationCode = this.generateVerificationCode();
        this.saveAndSendCode(user.id, user.email, verificationCode);
    }

    async isVerified(id: number): Promise<boolean> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });
        if (!user) {
            return false;
        }
        return user.verified;
    }

    private async saveAndSendCode(id: number, email: string, code: string) {
        await this.prismaService.verificationCode.create({
            data: {
                code: code,
                userId: id,
            },
        });
        await this.mailerService.sendMail({
            text: `Your account verificaiton code is: ${code}`,
            to: email,
            subject: 'Ataa Login Verification Code',
        });
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

    private generateVerificationCode(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
}
