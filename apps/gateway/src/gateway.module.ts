import { Module } from '@nestjs/common';
import { CommonModule } from '@app/basic';
import { GatewayController } from './gateway.controller';
import { BaseModule } from './base/base.module';
import { CrudService } from '@app/common';

@Module({
  imports: [BaseModule, CommonModule.forRoot({ microservice: ['base'] })],
  controllers: [GatewayController],
  providers: [CrudService],
})
export class GatewayModule {
  constructor() {}
}
