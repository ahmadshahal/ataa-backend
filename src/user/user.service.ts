import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    profile() {
        return {
            user: 'AHmad',
        };
    }
}
