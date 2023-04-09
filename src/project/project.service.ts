import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async readOne(id: number): Promise<Project> {
        const project = await this.prismaService.project.findFirst({
            where: {
                id: id,
            },
        });
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }
        return project;
    }

    async readAll(): Promise<Project[]> {
        return await this.prismaService.project.findMany();
    }

    async create(createProjectDto: CreateProjectDto) {
        await this.prismaService.project.create({
            data: {
                title: createProjectDto.title,
                description: createProjectDto.description,
                goals: createProjectDto.goals,
                target: createProjectDto.target,
                tags: createProjectDto.tags,
            },
        });
    }

    async delete(id: number) {
        try {
            await this.prismaService.project.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Project Not Found');
                }
            }
            throw error;
        }
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        try {
            await this.prismaService.project.update({
                where: {
                    id: id,
                },
                data: {
                    title: updateProjectDto.title,
                    description: updateProjectDto.description,
                    goals: updateProjectDto.goals,
                    target: updateProjectDto.target,
                    tags: updateProjectDto.tags,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Project Not Found');
                }
            }
            throw error;
        }
    }
}
