import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async readOne(id: number): Promise<Project> {
        return await this.prismaService.project.findFirst({
            where: {
                id: id,
            },
        });
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
                raised: createProjectDto.raised,
                target: createProjectDto.target,
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
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    // ?: Forbidden or BadRequest?
                    throw new ForbiddenException();
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
                    raised: updateProjectDto.raised,
                    target: updateProjectDto.target,
                },
            });
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    // ?: Forbidden or BadRequest?
                    throw new ForbiddenException();
                }
            }
            throw error;
        }
    }
}
