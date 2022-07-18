import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

import { Role } from '#entities/user.entity';
import { AuthStrategy } from '#modules/auth/auth.constant';
import { JWTRolesGuard } from '#modules/auth/strategies/jwt.strategy';

export function JWTAdminGuard(): ClassDecorator & MethodDecorator {
  return applyDecorators(
    UseGuards(JWTRolesGuard(Role.Admin)),
    ApiSecurity(AuthStrategy.JWT),
  );
}
