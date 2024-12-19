import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';

/**
 * redis模块
 */
@Module({})
export class CacheModule {
  static forRoot(): DynamicModule {
    return {
      module: CacheModule,
      imports: [
        NestCacheModule.registerAsync({
          isGlobal: true,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const { host, port, password, db, ttl } =
              configService.get('redis');

            const options = {
              url: `redis://${host}:${port}/${db}`,
              // password,
              socket: {
                host,
                port,
                tls: false, // Enable TLS if you need to connect over SSL
                keepAlive: ttl, // Keep-alive timeout (in milliseconds)
              },
            };

            return {
              stores: [
                new Keyv({
                  store: new KeyvRedis(options),
                }),
              ],
            };
          },
        }),
      ],
    };
  }
}
