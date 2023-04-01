import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: String

    @IsString()
    @IsNotEmpty()
    password: String
    
    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: String
}