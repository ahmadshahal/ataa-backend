import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password: string;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;
}
