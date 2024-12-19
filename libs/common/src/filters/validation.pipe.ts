import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';

export const ValidationPipeProvider = {
  provide: APP_PIPE,
  useFactory: (i18n: I18nService) => {
    return new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      validationError: {
        target: false, // 不返回目标对象
        value: false, // 不返回非法值
      },
      exceptionFactory: (errors) => {
        return new BadRequestException(i18n.t('guard.parameter_error'));
      },
    });
  },
  inject: [I18nService],
};
