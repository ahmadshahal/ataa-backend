import {
    Body,
    Controller,
    Delete,
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

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        this.projectService.create(createProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    update(@Param() params: any, @Body() UpdateProjectDto: UpdateProjectDto) {
        const projectId = Number(params.id);
        this.projectService.update(projectId, UpdateProjectDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    delete(@Param() params: any) {
        const projectId = Number(params.id);
        this.projectService.delete(projectId);
    }
}
