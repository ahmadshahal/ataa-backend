import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class VerificationGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.sub;
        const verified = this.authService.isVerified(userId);
        if (!verified) {
            throw new ForbiddenException();
        }
        return true;
    }
}
