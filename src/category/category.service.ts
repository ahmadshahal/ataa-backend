import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) {}

    async readOne(id: number): Promise<Category> {
        const category = await this.prismaService.category.findFirst({
            where: {
                id: id,
            },
        });
        if (!category) {
            throw new NotFoundException('Category Not Found');
        }
        return category;
    }

    async readAll(): Promise<Category[]> {
        return await this.prismaService.category.findMany();
    }

    async create(createCategoryDto: CreateCategoryDto) {
        await this.prismaService.category.create({
            data: {
                title: createCategoryDto.title,
            },
        });
    }

    async delete(id: number) {
        try {
            await this.prismaService.category.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Category Not Found');
                }
            }
            throw error;
        }
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        try {
            await this.prismaService.category.update({
                where: {
                    id: id,
                },
                data: {
                    title: updateCategoryDto.title,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Category Not Found');
                }
            }
            throw error;
        }
    }
}
