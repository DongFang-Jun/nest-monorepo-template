import { Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';

@Injectable()
export class SnowflakeService {
  private snowflake: SnowflakeId;

  constructor() {
    this.snowflake = new SnowflakeId({
      mid: 42, // 机器 ID，确保唯一性
    });
  }

  /**
   * 生成 ID
   */
  generateId(): string {
    return this.snowflake.generate().toString();
  }
}
