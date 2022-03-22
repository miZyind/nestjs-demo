import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity } from '@nestjs/swagger';

import { AuthStrategy } from '#modules/auth/auth.constant';

export function SecretGuard(): ClassDecorator & MethodDecorator {
  return applyDecorators(
    UseGuards(AuthGuard(AuthStrategy.Secret)),
    ApiSecurity(AuthStrategy.Secret),
  );
}
