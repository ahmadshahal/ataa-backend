import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGurad } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGurad)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('profile')
    async profile() {
        return this.userService.profile();
    }
}
