import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService, JwtService, User } from '@app/common';
import { CacheService } from '@app/common/services/cache.service';
import { SnowflakeService } from '@app/common/services/snowId.service';
import { I18nService } from 'nestjs-i18n';
import { set } from 'lodash';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly crudService: CrudService,
    private readonly cacheService: CacheService,
    private readonly snowflakeService: SnowflakeService,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Base服务测试
   */
  async baseTest() {
    const setRedis = await this.cacheService.setCode('test', '测试');
    const getRedis = await this.cacheService.getCode('test');
    const language = this.i18n.t('global.test');
    const snowId = this.snowflakeService.generateId();
    // const setToken = this.jwtService.generateToken('wujunjie');
    // const getToken = this.jwtService.decodeToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ3dWp1bmppZSIsImlhdCI6MTczNDU3NTc4MywiZXhwIjoxNzM0NTc5MzgzfQ.WngKOEPzGEkr74lAQnxeajcVWhVjZFlaEzfSFopBocA',
    // );
    // console.log(setToken);
    // return setToken;
    return this.crudService.findOne({
      repository: this.userRepository,
      params: { id: '12' },
    });
  }
}
