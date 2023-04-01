import { Controller, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGurad } from 'src/auth/guard/jwt.guard';
import { UserId } from 'src/auth/decorator/user-id.decorator';

@UseGuards(JwtGurad)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Get('profile')
    profile(@UserId() userId: number) {
        return this.userService.profile(userId);
    }
}
