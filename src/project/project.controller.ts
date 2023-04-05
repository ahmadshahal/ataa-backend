import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
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
    async readOne(@Param() params: any) {
        const projectId = Number(params.id);
        return await this.projectService.readOne(projectId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        await this.projectService.create(createProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    async update(
        @Param() params: any,
        @Body() UpdateProjectDto: UpdateProjectDto,
    ) {
        const projectId = Number(params.id);
        await this.projectService.update(projectId, UpdateProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param() params: any) {
        const projectId = Number(params.id);
        await this.projectService.delete(projectId);
    }
}
