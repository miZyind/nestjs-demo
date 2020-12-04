import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';

import { AccountRole } from '#entities/account.entity';

import { AuthStrategy } from '../auth.constant';
import { JWTPayload } from '../strategies/jwt.strategy';

export function RolesGuard(...roles: AccountRole[]): Type<IAuthGuard> {
  @Injectable()
  class MixinRolesGuard extends AuthGuard(AuthStrategy.JWT) {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isVerified = (await super.canActivate(context)) as boolean;

      if (isVerified) {
        const {
          user: { role },
        } = context.switchToHttp().getRequest<{ user: JWTPayload }>();

        return roles.includes(role);
      }

      return false;
    }
  }

  return MixinRolesGuard;
}
