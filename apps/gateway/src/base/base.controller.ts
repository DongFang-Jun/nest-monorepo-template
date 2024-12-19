import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectGuard, TokenGuard } from '@app/common';
import { BaseTestDto } from './base.dto';

@Controller('base')
export class BaseController {
  constructor(@Inject('base') private readonly baseService: ClientProxy) {}

  /**
   * Base服务测试接口
   * @returns
   */
  @Get('/test')
  // @UseGuards(TokenGuard, ProjectGuard)
  BaseTestApi(@Query() baseTestDto: BaseTestDto) {
    return this.baseService.send({ cmd: 'BaseTest' }, baseTestDto);
  }
}
