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
    @IsNumberString() // ?: @IsNumber()
    raised: number

    @IsNotEmpty()
    @IsNumberString() // ?: @IsNumber()
    target: number

    // TODO: Add Tags.
    // TODO: Add Category.
}