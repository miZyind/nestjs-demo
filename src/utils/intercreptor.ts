import { Request } from 'express';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class SafeCrudRequestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): ReturnType<CallHandler['handle']> {
    const req = context.switchToHttp().getRequest<Request & CrudRequest>();

    if (req.NESTJSX_PARSED_CRUD_REQUEST_KEY !== undefined) {
      const {
        parsed: { limit, page },
      } = req.NESTJSX_PARSED_CRUD_REQUEST_KEY;
      const DEFAULT_LIMIT = 8;
      const DEFAULT_PAGE = 1;
      const isValidLimit = Boolean(limit);
      const isValidPage = Boolean(page);

      req.NESTJSX_PARSED_CRUD_REQUEST_KEY.parsed.limit = isValidLimit
        ? limit
        : DEFAULT_LIMIT;

      req.NESTJSX_PARSED_CRUD_REQUEST_KEY.parsed.page = isValidPage
        ? page
        : DEFAULT_PAGE;
    }

    return next.handle();
  }
}
