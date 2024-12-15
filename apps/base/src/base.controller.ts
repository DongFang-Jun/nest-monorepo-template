import { Controller } from '@nestjs/common';
import { BaseService } from './base.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  /**
   * 测试接口
   * @constructor
   */
  @MessagePattern({ cmd: 'BaseTest' })
  BaseTest() {
    return this.baseService.baseTest();
  }
}
