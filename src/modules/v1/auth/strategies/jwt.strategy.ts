import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AccountRole } from '#entities/account.entity';

import { AuthStrategy } from '../auth.constant';
import { AuthService } from '../auth.service';

export interface JWTPayload {
  uuid: string;
  email: string;
}

export interface ValidatedAccount extends JWTPayload {
  role: AccountRole;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(private readonly service: AuthService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (config.get(Config.App) as AppConfig).jwt.secret,
    });
  }

  async validate(payload: JWTPayload): Promise<ValidatedAccount> {
    const role = await this.service.validateAccountAndGetRole(payload.uuid);

    return { ...payload, role };
  }
}
