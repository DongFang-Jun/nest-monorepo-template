import { Module } from '@nestjs/common';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { CommonModule, User } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CommonModule.forRoot({
      ormStatus: true,
      ormKey: 'base',
      redisStatus: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule {}
