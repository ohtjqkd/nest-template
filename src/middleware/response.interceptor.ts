import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IServerResponse {
  success: boolean;
  message: string;
  data: any;
  error: any;
}
@Injectable()
export class ResponseTransformerInterceptor<T>
  implements NestInterceptor<T, IServerResponse>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    context.switchToHttp().getResponse().status = 200;
    return next.handle().pipe(
      map((data): IServerResponse => {
        return {
          success: true,
          message: 'Success',
          data,
          error: null,
        };
      }),
    );
  }
}
