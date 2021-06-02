import { Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Environment } from '../config/config.interface';
import { join } from 'path';

@Module({
  imports: [
    NestServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Environment>) => [
        {
          rootPath: join(__dirname, '..', '..', 'static'),
          serveRoot: configService.get('STATIC_ROUTE'),
          exclude: ['api'],
        },
      ],
      inject: [ConfigService],
    }),
  ],
})
export class ServeStaticModule {}
