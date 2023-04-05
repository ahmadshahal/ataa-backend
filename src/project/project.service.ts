import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async read() {
        return await this.prismaService.project.findMany({
            select: {
                id: false,
                title: true,
                description: true,
                goals: true,
                raised: true,
            },
        });
    }

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

    async delete(projectId: number) {
        await this.prismaService.project.delete({
            where: {
                id: projectId,
            },
        });
    }

    async update(projectId: number, updateProjectDto: UpdateProjectDto) {
        await this.prismaService.project.update({
            where: {
                id: projectId,
            },
            data: {
                title: updateProjectDto.title,
                description: updateProjectDto.description,
                goals: updateProjectDto.goals,
                raised: updateProjectDto.raised,
                target: updateProjectDto.target,
            },
        });
    }
}
