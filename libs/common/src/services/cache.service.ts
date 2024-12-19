import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

/**
 * 缓存服务
 */
@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 获取redis值
   * @param key
   */
  public async getCode(key: string) {
    return await this.cache.get<string>(key);
  }

  /**
   * 设置redis值
   * @param key
   * @param value
   * @param ttl //单位分钟，已自动处理成库需要的毫秒单位了
   */
  public async setCode(key: string, value: any, ttl?: number) {
    ttl = ttl ? ttl * 1000 * 60 : this.configService.get('redis.ttl');
    return this.cache.set(key, value, ttl);
  }
}
