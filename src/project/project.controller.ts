import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGurad } from 'src/auth/guard/jwt.guard';
import { CreateProjectDto } from './dto/create-project.dto';

// ?: Should I use it here? @UseGuards(JwtGurad)
@Controller('project')
export class ProjectController {
    @Post()
    create(@Body() body: CreateProjectDto) { }
}
