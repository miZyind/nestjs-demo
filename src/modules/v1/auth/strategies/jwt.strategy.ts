import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AccountRole } from '#entities/account.entity';

import { AuthStrategy } from '../auth.constant';

export interface JWTPayload {
  uuid: string;
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
    return payload;
  }
}
