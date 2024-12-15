import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { printLogger } from '@app/utils/logger';
import { TcpContext } from '@nestjs/microservices';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();

    let resNext = next.handle();

    if (response instanceof TcpContext) {
      // 网关服务请求微服务
      resNext = resNext.pipe(map((data) => data || {}));
    } else {
      const now = Date.now();
      // 为每个请求生成唯一 ID
      const requestId = uuidv4();

      request.requestId = requestId;
      request.requestStartTime = now;

      // 设置请求id至请求头
      request.headers['x-request-id'] = requestId;
      // 设置请求开始时间至请求头
      request.headers['x-start-time'] = now;

      // printLogger(this.loggerService, request);
      resNext = resNext.pipe(
        map((data) => ({
          code: context.switchToHttp().getResponse().statusCode,
          data,
          message: 'success',
          timestamp: new Date().toISOString(),
          requestId,
        })),
        tap((data) => {
          printLogger(this.loggerService, request, data);
        }),
      );
    }

    return resNext.pipe();
  }
}
