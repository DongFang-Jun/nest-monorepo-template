import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';

type StartOptions = NestApplicationOptions & {
  microservice?: string;
};

export async function Start(module: any, options: StartOptions) {
  const { microservice, ...mainOptions } = options || {};

  const app = await NestFactory.create(module, mainOptions);

  // 获取配置服务
  const configService = app.get<ConfigService>(ConfigService);

  if (!microservice) {
    // 网关服务配置
    const server = configService.get('server');
    // 启动HTTP服务
    await app.listen(server.port);
    return;
  }

  // 获取配置文件中的microservices,使用微服务
  const microservices = configService.get(`microservices.${microservice}`);
  if (!microservices) {
    // 网关服务配置
    const server = configService.get('server');
    // 启动HTTP服务
    await app.listen(server.port);
    return;
  }

  const { config, server } = microservices;
  // 微服务配置
  app.connectMicroservice<MicroserviceOptions>(config, {
    inheritAppConfig: true,
  });
  // 启动所有微服务
  await app.startAllMicroservices();
  // 网关服务配置
  await app.listen(server.port);
}
