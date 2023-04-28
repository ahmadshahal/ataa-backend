import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma, Project } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectService {
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
    ) {}

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

    async create(createProjectDto: CreateProjectDto, imageFileName: string) {
        const assetsRelativePath = this.configService.get(
            'ASSETS_RELATIVE_PATH',
        );
        try {
            await this.prismaService.project.create({
                data: {
                    title: createProjectDto.title,
                    description: createProjectDto.description,
                    imageUrl: `${assetsRelativePath}/${imageFileName}`,
                    goals: createProjectDto.goals,
                    target: createProjectDto.target,
                    tags: createProjectDto.tags,
                    categories: {
                        connect: createProjectDto.categories?.map(
                            (categoryId) => ({
                                id: categoryId,
                            }),
                        ),
                    },
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Some Categories Not Found');
                }
            }
            throw error;
        }
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

    async update(
        id: number,
        updateProjectDto: UpdateProjectDto,
        imageFileName: string,
    ) {
        const assetsRelativePath = this.configService.get(
            'ASSETS_RELATIVE_PATH',
        );
        try {
            await this.prismaService.project.update({
                where: {
                    id: id,
                },
                data: {
                    title: updateProjectDto.title,
                    description: updateProjectDto.description,
                    imageUrl: `${assetsRelativePath}/${imageFileName}`,
                    goals: updateProjectDto.goals,
                    target: updateProjectDto.target,
                    tags: updateProjectDto.tags,
                    categories: {
                        connect: updateProjectDto.categories?.map(
                            (categoryId) => ({
                                id: categoryId,
                            }),
                        ),
                    },
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(
                        'Project Or Some Categories Not Found',
                    );
                }
            }
            throw error;
        }
    }
}
