import { Module } from '@nestjs/common';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { CommonModule } from '@app/basic';
import { User } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CommonModule.forRoot({ ormStatus: true, ormKey: 'base' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule {}
