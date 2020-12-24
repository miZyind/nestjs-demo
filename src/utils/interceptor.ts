import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CrudRequest, CrudRequestInterceptor } from '@nestjsx/crud';

import { StandardResponse } from '#models/standard';

import { hasValue } from './guarder';

export const DEFAULT_PAGINATION_LIMIT = 8;
export const DEFAULT_PAGINATION_PAGE = 1;

type InterceptedRequest = Request & {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- NestJS' consistent key name
  NESTJSX_PARSED_CRUD_REQUEST_KEY?: CrudRequest;
};

@Injectable()
export class SafeCrudRequestInterceptor extends CrudRequestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): ReturnType<CallHandler['handle']> {
    super.intercept(context, next);

    const req = context.switchToHttp().getRequest<InterceptedRequest>();

    if (hasValue(req.NESTJSX_PARSED_CRUD_REQUEST_KEY)) {
      const {
        parsed: { limit, page },
      } = req.NESTJSX_PARSED_CRUD_REQUEST_KEY;

      req.NESTJSX_PARSED_CRUD_REQUEST_KEY.parsed.limit = limit
        ? limit
        : DEFAULT_PAGINATION_LIMIT;

      req.NESTJSX_PARSED_CRUD_REQUEST_KEY.parsed.page = page
        ? page
        : DEFAULT_PAGINATION_PAGE;
    }

    return next.handle();
  }
}

type Nullable<T> = T | null;

type Result<T> = StandardResponse<
  Nullable<T> | { data: Nullable<T>; total: number }
>;

@Injectable()
export class StandardResponseInterceptor<T>
  implements NestInterceptor<T, Result<T>> {
  intercept(
    _: ExecutionContext,
    next: CallHandler<Nullable<T>>,
  ): Observable<Result<T>> {
    return next.handle().pipe(
      map((data) => {
        const standardResponse = {
          code: 0,
          message: 'Success',
          data: data ?? null,
        };

        // Transform array data into standard response
        if (data instanceof Array) {
          return {
            ...standardResponse,
            data: { data, total: data.length },
          };
        }

        return standardResponse;
      }),
    );
  }
}
