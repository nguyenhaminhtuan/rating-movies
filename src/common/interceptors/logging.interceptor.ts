import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const format = (endTime: number) =>
      `[${request.method}] ${request.url} ${response.statusCode} ${
        endTime - startTime
      }ms`;

    return next.handle().pipe(
      tap(() => this.logger.log(format(Date.now()))),
      catchError((err: Error) => {
        this.logger.error(format(Date.now()), err.stack);
        return throwError(err);
      }),
    );
  }
}
