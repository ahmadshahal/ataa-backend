import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            // ?: What the hell is this?
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    service: configService.get('MAIL_HOST'),
                    auth: {
                        user: configService.get('MAIL_USERNAME'),
                        pass: configService.get('MAIL_PASSWORD'),
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [AuthService],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
