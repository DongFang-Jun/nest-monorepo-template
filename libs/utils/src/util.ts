import { LoggerService } from '@nestjs/common';
import lodash from 'lodash';

import bcrypt from 'bcrypt';

/**
 * 比较 hash
 * @param rawStr
 * @param hashedStr
 */
export const compareHash = async (rawStr: string, hashedStr: string) => {
  return bcrypt.compareSync(rawStr, hashedStr);
};

/**
 * 生成 hash
 * @param rawStr
 * @param salt
 */
export const createHash = async (rawStr: string, salt?: string) => {
  // 用于哈希密码的盐
  const SALT_ROUNDS = 10;

  return bcrypt.hashSync(rawStr, salt || SALT_ROUNDS);
};
