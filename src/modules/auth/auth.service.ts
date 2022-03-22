import { hasValue } from 'nestjs-xion/guarder';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from '#modules/account/account.service';
import { AuthError } from '#modules/auth/auth.constant';

import type { Role } from '#entities/account.entity';
import type { LogInDTO } from '#modules/auth/dtos/log-in.dto';
import type { LogInResponse } from '#modules/auth/responses/log-in.response';
import type { JWTPayload } from '#modules/auth/strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAttemptAndSignToken({
    email,
    attempt,
  }: LogInDTO): Promise<LogInResponse> {
    const entity = await this.accountService.findOne({
      select: ['uuid', 'status', 'password'],
      where: { email },
    });

    if (hasValue(entity) && (await entity.comparePassword(attempt))) {
      this.accountService.validateStatus(entity.status);

      const token = await this.jwtService.signAsync({
        uuid: entity.uuid,
        email,
      } as JWTPayload);

      this.logger.debug(`Account [${email}] logged in`);

      return { token };
    }

    throw new BadRequestException(AuthError.InvalidLoginCredentials);
  }

  async validateAccountAndGetRole(uuid: string): Promise<Role> {
    const entity = await this.accountService.findOne({
      select: ['status', 'role'],
      where: { uuid },
    });

    if (hasValue(entity)) {
      this.accountService.validateStatus(entity.status);

      return entity.role;
    }

    throw new BadRequestException(AuthError.InvalidToken);
  }
}
