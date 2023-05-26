import { AuthService } from '@app/common/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService
  ) { }
}
