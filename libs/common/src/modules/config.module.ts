import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleSource } from '@nestjs/config';
import yaml from 'js-yaml';
import path from 'path';
import lodash from 'lodash';
import fs from 'fs';
import { FIXED_KEY } from '@app/common/config/constant';

const envFileNames = ['development.yaml', 'production.yaml']; // 环境配置文件

/**
 * 配置模块
 */
@Module({
  imports: [
    ConfigModuleSource.forRoot({
      cache: true,
      isGlobal: true,
      load: [
        () => {
          // 配置文件目录
          const configPath = path.join(FIXED_KEY.rootPath, 'config');
          // 获取所有配置文件名
          let configFileNames = fs.readdirSync(configPath);
          // 过滤环境配置
          configFileNames = configFileNames.filter(
            (fileName) => !envFileNames.includes(fileName),
          );
          // 插入当前环境配置
          configFileNames.push(`${process.env.NODE_ENV || 'development'}.yaml`);

          // 合并配置
          let config: any = {};

          configFileNames.forEach((fileName) => {
            try {
              // 配置文件路径
              const filePath = path.join(configPath, fileName);
              // 文件是否存在
              const exists = fs.existsSync(filePath);
              if (exists) {
                // 配置文本
                const currentConfigText = fs.readFileSync(filePath, 'utf8');
                const currentConfig = yaml.load(currentConfigText); // 配置对象
                config = lodash.merge(config, currentConfig); // 深合并配置
              }
            } catch {}
          });

          // 递归处理配置值
          config = lodash.cloneDeepWith(config, (value) => {
            // null 转为 空字符串
            if (value === null) return '';
          });

          return config;
        },
      ],
    }),
  ],
})
export class ConfigModule {}
