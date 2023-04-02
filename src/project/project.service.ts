import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async create(createProjectDto: CreateProjectDto) {
        await this.prismaService.project.create({
            data: {
                title: createProjectDto.title,
                description: createProjectDto.description,
                goals: createProjectDto.goals,
                raised: createProjectDto.raised,
                target: createProjectDto.target,
            },
        });
    }
}
