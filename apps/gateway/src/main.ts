import { GatewayModule } from './gateway.module';
import { Start } from '@app/common/utils/start';

Start(GatewayModule, {
  cors: true, // 允许跨域请求
}).then();
