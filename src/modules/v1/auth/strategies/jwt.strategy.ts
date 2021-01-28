import { ExtractJwt, Strategy } from 'passport-jwt';

import { Inject, Injectable } from '@nestjs/common';
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
  constructor(
    private readonly service: AuthService,
    @Inject(`CONFIGURATION(${Config.App})`) { jwt }: AppConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt.secret,
    });
  }

  async validate(payload: JWTPayload): Promise<ValidatedAccount> {
    const role = await this.service.validateAccountAndGetRole(payload.uuid);

    return { ...payload, role };
  }
}
