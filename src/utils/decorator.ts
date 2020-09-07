import { HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger';

import { Standardized } from './standardizer';

interface ApiStandardResponseOptions<T> extends ApiResponseMetadata {
  status?: HttpStatus;
  type?: Type<T>;
}

export function ApiStandardResponse<T>(
  options?: ApiStandardResponseOptions<T>,
) {
  return function <D>(
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<D>,
  ): void {
    ApiResponse({
      ...options,
      status: options?.status ?? HttpStatus.OK,
      type: Standardized(options?.type),
    })(target, key, descriptor);
  };
}
