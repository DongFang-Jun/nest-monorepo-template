import { DynamicModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter, TransformInterceptor } from '@app/common/filters';

import {
  CacheModule,
  ConfigModule,
  I18nModule,
  JwtModule,
  LoggerModule,
  MicroserviceModule,
  TypeormModule,
} from '@app/common/modules';

import {
  CacheService,
  CrudService,
  SnowflakeService,
} from '@app/common/services';
import { ValidationPipeProvider } from '@app/common/filters/validation.pipe';

interface Options {
  ormStatus?: boolean; //是否使用数据库
  ormKey?: string; //数据库名
  redisStatus?: boolean; //是否使用redis
  // redisKey?: boolean; //redis名
  microservice?: string[]; //微服务名称集合（多用于网关服务）
  isGateway?: boolean; //是否是网关服务
}

/**
 * 全局模块
 */
export class CommonModule {
  static forRoot(options?: Options): DynamicModule {
    const imports: DynamicModule['imports'] = [
      ConfigModule,
      LoggerModule,
      I18nModule,
      JwtModule.forRoot(),
    ];
    let providers: DynamicModule['providers'] = [
      { provide: APP_FILTER, useClass: AllExceptionFilter },
      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      ValidationPipeProvider,
      CrudService,
      SnowflakeService,
    ];
    let exports: DynamicModule['exports'] = [
      CrudService,
      SnowflakeService,
      JwtModule,
    ];

    // 数据库
    if (options?.ormStatus && options?.ormKey) {
      imports.push(TypeormModule.forRoot(options.ormKey));
    }

    // redis
    if (options.redisStatus) {
      imports.push(CacheModule.forRoot());
      providers.push(CacheService);
      exports.push(CacheService);
    }

    // 微服务
    if (options?.microservice && options?.microservice?.length) {
      imports.push(MicroserviceModule.forRoot(options.microservice));
    }

    // 网关服务
    if (options?.isGateway) {
      providers = [...providers];
      exports = [...exports];
    }

    return {
      module: CommonModule,
      imports,
      providers,
      exports,
    };
  }
}
