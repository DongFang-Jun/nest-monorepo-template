import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';

/**
 * 微服务注册模块
 */
@Module({})
export class MicroserviceModule {
  static forRoot(microservices: string[] = []): DynamicModule {
    return {
      module: MicroserviceModule,
      imports: [
        {
          ...ClientsModule.registerAsync(
            microservices.map((name) => ({
              name,
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                return configService.get(`microservices.${name}`)?.config;
              },
            })),
          ),
          global: true,
        },
      ],
    };
  }
}
