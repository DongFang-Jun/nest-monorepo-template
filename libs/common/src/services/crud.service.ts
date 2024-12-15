import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CrudService {
  // findList
  // findListAndCount
  // deleteOne
  // updateOne
  /**
   * 查询单个数据
   * @param repository
   * @param params
   */
  async findOne<T>({
    repository,
    params,
  }: {
    repository: Repository<T>;
    params: any;
  }): Promise<T> {
    const { relations, ...where } = params;
    const value = await repository.findOne({
      where,
      relations,
    });
    if (!value) {
      // throw new NotFoundException(this.i18n.t('common.not_fount'));
      throw new NotFoundException('212');
    }
    return value;
  }
}
