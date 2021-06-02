import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config/config.interface';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get<ConfigService<Environment>>(ConfigService);
  const logger = new Logger('NestApplication');

  const host = configService.get<string>('HOST');
  const port = configService.get<number>('PORT');
  const allowedHosts = configService.get<string>('ALLOWED_HOSTS').split(',');

  app.setGlobalPrefix('api');
  app.enableCors({ origin: allowedHosts });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port, host);
  logger.log(`Nest application running on ${await app.getUrl()}`);
}
bootstrap();
