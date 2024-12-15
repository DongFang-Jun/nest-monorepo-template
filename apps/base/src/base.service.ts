import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService, User } from '@app/common';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly crudService: CrudService,
  ) {}

  /**
   * Base服务测试
   */
  baseTest() {
    return this.crudService.findOne({
      repository: this.userRepository,
      params: { id: '12' },
    });
  }
}
