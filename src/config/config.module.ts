import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        HOST: Joi.string().default('127.0.0.1'),
        PORT: Joi.number().default(3000),
        HOSTNAME: Joi.string().default('http://localhost:3000'),
        ALLOWED_HOSTS: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        STATIC_ROUTE: Joi.string().default('/static'),
      }),
      validationOptions: {
        stripUnknown: true,
        allowUnknown: false,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
