import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { VerificationGuard } from 'src/auth/guard/verification.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectImageValidator } from './validator/project.validator';

@UseGuards(JwtGuard, VerificationGuard)
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

    // ?: Image is uploaded even after failing validation..
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() createProjectDto: CreateProjectDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: ProjectImageValidator,
                fileIsRequired: false,
            }),
        )
        image: Express.Multer.File,
    ) {
        await this.projectService.create(createProjectDto, image?.filename);
    }

    // ?: Image is uploaded even after failing validation..
    @HttpCode(HttpStatus.OK)
    @Post(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() UpdateProjectDto: UpdateProjectDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: ProjectImageValidator,
                fileIsRequired: false,
            }),
        )
        image: Express.Multer.File,
    ) {
        await this.projectService.update(id, UpdateProjectDto, image?.filename);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.projectService.delete(id);
    }
}
