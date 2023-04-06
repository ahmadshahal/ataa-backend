import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { JwtModule } from '@nestjs/jwt';

// *: 1- yarn start:dev
// *: 2- yarn db:dev:restart
// *: 3- yarn prisma migrate deploy

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({ global: true }),
        UserModule,
        PrismaModule,
        ProjectModule,
    ],
})
export class AppModule {}
