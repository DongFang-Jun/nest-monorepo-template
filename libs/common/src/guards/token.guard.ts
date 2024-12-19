import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException(this.i18n.t('guard.token_error'));
    }

    //  token = token.split(' ')[1];
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(this.i18n.t('guard.token_error'));
    }

    return true;
  }
}
