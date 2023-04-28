import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                dest: configService.get('ASSETS_ABSOLUTE_PATH'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
