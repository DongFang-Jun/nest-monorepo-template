import { Module } from '@nestjs/common';
import {
  HeaderResolver,
  I18nModule as NestI18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { FIXED_KEY } from '@app/common/config';

@Module({
  imports: [
    NestI18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { fallbackLanguage, path: i18nPath } =
          configService.getOrThrow('i18n');
        return {
          fallbackLanguage,
          loaderOptions: {
            path: `${FIXED_KEY.rootPath}${i18nPath}`,
            watch: true,
          },
        };
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  controllers: [],
})
export class I18nModule {}
