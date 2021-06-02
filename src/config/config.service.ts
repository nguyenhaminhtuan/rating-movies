import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService<
  K = Record<string, any>,
> extends NestConfigService<K> {}
