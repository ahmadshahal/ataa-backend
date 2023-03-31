import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  login(): string {
    return 'login function in AuthService';
  }

  signup(): string {
    return 'signup function in AuthService';
  }
}
