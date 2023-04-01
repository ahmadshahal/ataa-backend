import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;
}
