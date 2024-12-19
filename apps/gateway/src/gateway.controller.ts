import { Controller, Get, UseGuards } from '@nestjs/common';
import { TokenGuard } from '@app/common';

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
