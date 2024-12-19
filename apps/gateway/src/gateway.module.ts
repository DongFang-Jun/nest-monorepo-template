import { Module } from '@nestjs/common';
import { CommonModule } from '@app/common';
import { GatewayController } from './gateway.controller';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    CommonModule.forRoot({
      microservice: ['base'],
      redisStatus: true,
      isGateway: true,
    }),
    BaseModule,
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {
  constructor() {}
}
