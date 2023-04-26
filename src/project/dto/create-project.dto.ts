import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    goals: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    target: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MaxLength(30, { each: true })
    tags: string[];

    // ?: Should it be an array of IDs?
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    categories: number[];
}
