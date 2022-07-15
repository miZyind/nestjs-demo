import { Strategy as BaseStrategy } from 'passport-strategy';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AuthError, AuthStrategy } from '#modules/auth/auth.constant';

import type { Request } from 'express';

class Strategy extends BaseStrategy {
  constructor(
    private readonly verify: (
      req: Request,
      verified: (error: Error | null) => void,
    ) => void,
  ) {
    super();
  }

  authenticate(req: Request): void {
    try {
      this.verify(req, (error) => {
        if (error) {
          this.error(error);
        } else {
          this.success(true);
        }
      });
    } catch (error) {
      this.error(error as Error);
    }
  }
}

@Injectable()
export class SecretStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.Secret,
) {
  constructor(
    @Inject(`CONFIGURATION(${Config.App})`) private readonly config: AppConfig,
  ) {
    super();
  }

  validate(req: Request): void {
    if (req.header(AuthStrategy.Secret) !== this.config.secret) {
      throw new BadRequestException(AuthError.InvalidSecret);
    }
  }
}
