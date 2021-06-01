import { Logger } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new Logger('Database');

  logQuery(query: string) {
    this.logger.debug(query);
  }
  logQueryError(error: string | Error) {
    if (error instanceof Error) {
      this.logger.error(error.message, error.stack);
    } else {
      this.logger.error(error);
    }
  }
  logQuerySlow(time: number, query: string) {
    this.logger.warn(`Slow query: ${query} - ${time}ms`);
  }
  logSchemaBuild(message: string) {
    this.logger.debug(`[schema] ${message}`);
  }
  logMigration(message: string) {
    this.logger.debug(`[migration] ${message}`);
  }
  log(level: 'log' | 'info' | 'warn', message: any) {
    this.logger.debug(`[${level}] ${message}`);
  }
}
