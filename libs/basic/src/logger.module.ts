import path from 'path';
import { Module } from '@nestjs/common';
import { FIXED_KEY } from '@app/utils/constant';
import { ConfigService } from '@nestjs/config';

import winston from 'winston';
import { WinstonModule } from 'nest-winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';

/**
 * 日志模块
 */
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 获取日志文件配置存储路径
        const logsPath = configService.get(`logsPath`);
        // 日志存储绝对路径
        const filePath = path.join(FIXED_KEY.rootPath, logsPath);
        // 获取日志配置资料
        const logConfig = configService.get('logger') || {};

        return {
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, trace }) => {
              // 检查 trace 是否存在，并将其包含在日志输出中
              const traceInfo = trace ? `；trace：${trace}` : '';
              return `{timestamp:${timestamp}；level:${level.toUpperCase()}；${message}；${traceInfo}`;
            }),
          ),
          transports: [
            new WinstonDailyRotateFile({
              ...{ ...logConfig, filename: filePath || logConfig.filename },
              // 日志风格
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(
                  ({ timestamp, level, message, trace }) => {
                    // 检查 trace 是否存在，并将其包含在日志输出中
                    const traceInfo = trace ? `；trace：${trace}` : '';
                    return `{timestamp:${timestamp}；level:${level.toUpperCase()}；${message}${traceInfo}`;
                  },
                ),
              ),
            }),
            // 控制台是否打印日志信息
            // new winston.transports.Console(),
          ],
          exitOnError: false, // 防止意外退出
        };
      },
    }),
  ],
})
export class LoggerModule {}
