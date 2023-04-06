import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class VerificationDto {
    @IsNotEmpty()
    @IsNumberString()
    code: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}