import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // runs bebefore
    console.log('running before controller', context);

    // run after
    return handler.handle().pipe(
      map((data: any) => {
        console.log('runs after controller', data);
      }),
    );
  }
  //
}
