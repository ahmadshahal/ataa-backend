import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { VerificationGuard } from 'src/auth/guard/verification.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dt0';


@UseGuards(JwtGuard, VerificationGuard)
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async readAll() {
        return await this.categoryService.readAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.readOne(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        await this.categoryService.create(createCategoryDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        await this.categoryService.update(id, updateCategoryDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.categoryService.delete(id);
    }
}
