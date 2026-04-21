import { Role } from '#entities/user.entity';
import { AuthStrategy } from '#modules/auth/auth.constant';
import { JWTRolesGuard } from '#modules/auth/strategies/jwt.strategy';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

export function JWTUserGuard(): ClassDecorator & MethodDecorator {
  return applyDecorators(
    UseGuards(JWTRolesGuard(Role.Admin, Role.User)),
    ApiSecurity(AuthStrategy.JWT),
  );
}
