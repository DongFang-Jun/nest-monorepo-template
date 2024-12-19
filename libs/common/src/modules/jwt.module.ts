import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@app/common/services';

@Module({})
export class JwtModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtModule,
      global: true,
      imports: [
        NestJwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const { secret, expiresIn } = configService.getOrThrow('jwt');
            return {
              secret,
              signOptions: { expiresIn },
            };
          },
        }),
      ],
      providers: [JwtService],
      exports: [NestJwtModule, JwtService],
    };
  }
}
