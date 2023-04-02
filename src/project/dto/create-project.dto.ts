import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    goals: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    raised: number

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    target: number

    // TODO: Add Tags.
    // TODO: Add Category.
}