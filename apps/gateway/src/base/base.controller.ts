import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('base')
export class BaseController {
  constructor(@Inject('base') private readonly baseService: ClientProxy) {}

  /**
   * Base服务测试接口
   * @returns
   */
  @Get('/test')
  BaseTestApi() {
    return this.baseService.send({ cmd: 'BaseTest' }, {});
  }
}
