import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

// ?: Should I use it here? @UseGuards(JwtGurad)
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        this.projectService.create(createProjectDto);
    }
}
