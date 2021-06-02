import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DataResponse<T> {
  ok: boolean;
  statusCode: number;
  data: T;
  metadata?: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, DataResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DataResponse<T>> {
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data) {
          const result: DataResponse<typeof data> = {
            ok: response.statusCode <= 400,
            statusCode: response.statusCode,
            data: null,
          };

          if (data.data && data.metadata) {
            result.data = data.data;
            result.metadata = data.metadata;
          } else {
            result.data = data;
          }

          return result;
        }
      }),
    );
  }
}
