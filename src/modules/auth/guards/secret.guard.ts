import { AuthStrategy } from '#modules/auth/auth.constant';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity } from '@nestjs/swagger';

export function SecretGuard(): ClassDecorator & MethodDecorator {
  return applyDecorators(
    UseGuards(AuthGuard(AuthStrategy.Secret)),
    ApiSecurity(AuthStrategy.Secret),
  );
}
