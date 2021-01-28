import { Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

enum FilteredMessage {
  // 400: 10000
  ValidationError = 'Validation error, please check the request parameters',
  // 401: -1
  AuthorizationError = 'Authorization error, please provide a valid token',
  // 403: -1
  PermissionError = 'Permission error, please check that you have the correct permissions',
  // 404: -1
  APINotFoundError = 'API not found error, please send the correct request',
  // 500: -1
  InternalServerError = 'Internal server error, please contact the developers',
}

interface UnfilteredBody {
  statusCode?: HttpStatus;
  message: string[] | string;
}

interface FilteredBody {
  code: number;
  message: string;
  data: string[] | null;
}

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch<T extends ObjectConstructor>(error: T, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = error instanceof HttpException;
    const status = isHttpException
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const filteredBody: FilteredBody = {
      code: -1,
      message: FilteredMessage.InternalServerError,
      data: null,
    };

    if (error instanceof HttpException) {
      const { statusCode, message } = error.getResponse() as UnfilteredBody;

      switch (statusCode) {
        case HttpStatus.BAD_REQUEST:
          if (Array.isArray(message)) {
            filteredBody.code = 10000;
            filteredBody.message = FilteredMessage.ValidationError;
            filteredBody.data = message;
          } else {
            filteredBody.message = message;
          }
          break;
        case HttpStatus.UNAUTHORIZED:
          filteredBody.message = FilteredMessage.AuthorizationError;
          break;
        case HttpStatus.FORBIDDEN:
          filteredBody.message = FilteredMessage.PermissionError;
          break;
        case HttpStatus.NOT_FOUND:
          filteredBody.message = FilteredMessage.APINotFoundError;
          break;
        default:
          break;
      }
    }

    switch (error.constructor) {
      case UnauthorizedException:
      case ForbiddenException:
      case NotFoundException:
        break;
      default:
        console.error('[BaseExceptionFilter]', error);
        break;
    }

    response.status(status).json(filteredBody);
  }
}
