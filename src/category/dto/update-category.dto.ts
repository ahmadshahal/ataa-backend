import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateCategoryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;
}