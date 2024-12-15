import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * 数据库模块
 */
@Module({})
export class TypeormModule {
  static forRoot(ormKey): DynamicModule {
    return {
      module: TypeormModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              ...configService.get(`db.${ormKey}`),
              autoLoadEntities: true,
            };
          },
        }),
      ],
    };
  }
}
