import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';

// ?: Should I use it here? @UseGuards(JwtGurad)
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    async readAll() {
        return await this.projectService.readAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number) {
        return await this.projectService.readOne(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        await this.projectService.create(createProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() UpdateProjectDto: UpdateProjectDto,
    ) {
        await this.projectService.update(id, UpdateProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.projectService.delete(id);
    }
}
