import { createParamDecorator } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { LocaleCode } from '#app/app.constant';

import type { Request } from 'express';
import type { ExecutionContext } from '@nestjs/common';

export function Locale(): ParameterDecorator {
  return createParamDecorator((_, ctx: ExecutionContext) => {
    const { locale } = ctx.switchToHttp().getRequest<Request>().query;

    switch (locale) {
      default:
        return LocaleCode.English;
      case LocaleCode.English:
      case LocaleCode.Vietnamese:
      case LocaleCode.SimplifiedChinese:
      case LocaleCode.TraditionalChinese:
        return locale;
    }
  })();
}

export function ApiLocale(): MethodDecorator {
  return (...params): void => {
    ApiQuery({ name: 'locale', example: 'en-US' })(...params);
  };
}
