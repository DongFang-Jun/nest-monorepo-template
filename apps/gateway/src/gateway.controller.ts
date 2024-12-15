import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayController {
  /**
   * 网关服务测试接口
   * @constructor
   */
  @Get('/test')
  GatewayTestApi() {
    return 'gateway服务启动成功！';
  }
}
