import { ExtractJwt, Strategy } from 'passport-jwt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AccountRole, AccountStatus } from '#entities/account.entity';

import { AuthError, AuthStrategy } from '../auth.constant';

export interface JWTPayload {
  uuid: string;
  status: AccountStatus;
  role: AccountRole;
  email: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (config.get(Config.App) as AppConfig).jwt.secret,
    });
  }

  validate(payload: JWTPayload): JWTPayload {
    switch (payload.status) {
      case AccountStatus.ApprovePending:
        throw new BadRequestException(AuthError.ThisAccountHasNotBeenApproved);
      case AccountStatus.Approved:
        return payload;
      case AccountStatus.Banned:
        throw new BadRequestException(AuthError.ThisAccountHasBeenBanned);
      default:
        throw new BadRequestException(AuthError.InvalidLoginCredentials);
    }
  }
}
