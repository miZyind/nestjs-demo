import { ExtractJwt, Strategy } from 'passport-jwt';

import { Inject, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AuthStrategy } from '#modules/auth/auth.constant';
import { AuthService } from '#modules/auth/auth.service';

import type { ExecutionContext } from '@nestjs/common';
import type { IAuthGuard, Type } from '@nestjs/passport';
import type { Role } from '#entities/account.entity';

export interface JWTPayload {
  uuid: string;
  email: string;
}

export interface Payload extends JWTPayload {
  role: Role;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(
    private readonly service: AuthService,
    @Inject(`CONFIGURATION(${Config.App})`) { jwt }: AppConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt.secret,
    });
  }

  async validate(payload: JWTPayload): Promise<Payload> {
    const role = await this.service.validateAccountAndGetRole(payload.uuid);

    return { ...payload, role };
  }
}

export function JWTRolesGuard(...roles: Role[]): Type<IAuthGuard> {
  @Injectable()
  class RolesGuardMixin extends AuthGuard(AuthStrategy.JWT) {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isVerified = (await super.canActivate(context)) as boolean;

      if (isVerified) {
        const request = context.switchToHttp().getRequest<{ user: Payload }>();

        return roles.includes(request.user.role);
      }

      return false;
    }
  }

  return RolesGuardMixin;
}
