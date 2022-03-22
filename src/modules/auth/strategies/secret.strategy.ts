import { Strategy } from 'passport-custom';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AuthError, AuthStrategy } from '#modules/auth/auth.constant';

import type { Request } from 'express';

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

  validate(req: Request): boolean {
    if (req.header(AuthStrategy.Secret) === this.config.secret) {
      return true;
    }

    throw new BadRequestException(AuthError.InvalidSecret);
  }
}
