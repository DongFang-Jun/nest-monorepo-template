import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly i18n: I18nService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const project = request.headers['project'];

    if (!project) {
      throw new UnauthorizedException(this.i18n.t('guard.project_missing'));
    }

    return true;
  }
}
