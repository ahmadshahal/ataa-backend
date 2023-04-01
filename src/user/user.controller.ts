import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGurad } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGurad)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('profile')
    profile(@Request() req: Request) {
        const userId = req['user'].sub;
        return this.userService.profile(userId);
    }
}
