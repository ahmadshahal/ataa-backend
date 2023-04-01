import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import(".prisma/client").User>;
    signup(signupDto: SignupDto): Promise<import(".prisma/client").User>;
}
