import { BaseModule } from './base.module';
import { Start } from '@app/common/utils/start';

Start(BaseModule, { microservice: 'base' }).then();
