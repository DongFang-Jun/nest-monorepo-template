import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@app/basic/config.module';
import { LoggerModule } from '@app/basic/logger.module';
import { TypeormModule } from '@app/basic/typeorm.module';
import { MicroserviceModule } from '@app/basic/microservice.module';
import { CrudService } from '@app/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@app/basic/transform.interceptor';
import { AllExceptionFilter } from '@app/basic/exception.filter';

interface Options {
  ormStatus?: boolean; //是否使用数据库
  ormKey?: string; //数据库名
  redisStatus?: boolean; //是否使用redis
  redisKey?: boolean; //redis名
  microservice?: string[]; //微服务名称集合（多用于网关服务）
}

/**
 * 全局模块
 */
export class CommonModule {
  static forRoot(options?: Options): DynamicModule {
    const imports: DynamicModule['imports'] = [ConfigModule, LoggerModule];
    const providers: DynamicModule['providers'] = [
      { provide: APP_FILTER, useClass: AllExceptionFilter },
      { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
      CrudService,
    ];

    // 数据库
    if (options?.ormStatus && options?.ormKey) {
      imports.push(TypeormModule.forRoot(options.ormKey));
    }

    // if(options.redisStatus){
    //   imports.push(TypeormModule.forRoot(options.redisKey))
    // }

    // 微服务
    if (options?.microservice && options?.microservice?.length) {
      imports.push(MicroserviceModule.forRoot(options.microservice));
    }

    return {
      module: CommonModule,
      imports,
      providers,
      exports: [CrudService],
    };
  }
}
