import { Start } from '@app/basic';
import { GatewayModule } from './gateway.module';

Start(GatewayModule, {
  cors: true, // 允许跨域请求
}).then();
