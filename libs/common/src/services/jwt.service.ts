import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly i18n: I18nService,
  ) {}

  /**
   * 生成 JWT Token
   * @param userId
   * @param expireTime
   */
  generateToken(userId: string, expireTime = '1h'): string {
    const payload = { userId };
    return this.nestJwtService.sign(payload, { expiresIn: expireTime });
  }

  /**
   * 解密 JWT Token 并验证
   * @param token
   */
  decodeToken(token: string): any {
    try {
      return this.nestJwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(this.i18n.t('guard.token_error'));
    }
  }
}
