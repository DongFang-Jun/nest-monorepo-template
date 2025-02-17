import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { throwError } from 'rxjs';
import { TcpContext } from '@nestjs/microservices';
import { printErrorLogger } from '@app/common/utils/logger';

/**
 * 报错过滤器
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    const data = null;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res !== 'string') {
        const { statusCode = exception.getStatus(), message: msg } = res as any;
        code = statusCode;
        message = Array.isArray(msg) ? msg[0] : msg;
      }
    } else if (exception.response) {
      const { statusCode, message: msg } = exception.response;
      code = statusCode;
      message = Array.isArray(msg) ? msg[0] : msg;
    } else {
      printErrorLogger(this.loggerService, request, exception);
    }

    const resJson = { code, data, message };

    if (response instanceof TcpContext) {
      return throwError(exception);
    }

    printErrorLogger(this.loggerService, request, resJson);

    response.status(code).json(resJson);
  }
}

// Bad Request Exception 错误的请求异常
// Unauthorized Exception 未经授权的例外
// Not Found Exception 找不到异常
// Forbidden Exception 禁止例外
// Not Acceptable Exception 不可接受的例外
// Request Timeout Exception 请求超时异常
// Conflict Exception 冲突例外
// Gone Exception 异常消失
// Pay load Too Large Exception 有效负载过大
// Unsupported Media Type Exception 不支持的媒体类型异常
// Unprocessab le Exception 无法处理的异常
// Internal Server Error Exception 内部服务器错误异常
// Not Imp lemented Exception 未实施异常
// Bad Gateway Exception 错误的网关异常
// Service Unavailab le Exception 服务不可用异常
// Gateway Timeout Exception 网关超时异常
