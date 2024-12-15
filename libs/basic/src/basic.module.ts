import { Module } from '@nestjs/common';
import { BasicService } from './basic.service';

@Module({
  providers: [BasicService],
  exports: [BasicService],
})
export class BasicModule {}
