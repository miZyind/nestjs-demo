import { hasValue } from 'nestjs-xion/guarder';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountRole } from '#entities/account.entity';
import { AccountService } from '#v1/account/account.service';

import { AuthError } from './auth.constant';
import { LogInDTO } from './dtos/log-in.dto';
import { LogInResponse } from './responses/log-in.response';
import { JWTPayload } from './strategies/jwt.strategy';

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
    const account = await this.accountService.findOne({
      select: ['uuid', 'status', 'password'],
      where: { email },
    });

    if (hasValue(account) && (await account.comparePassword(attempt))) {
      this.accountService.validateStatus(account.status);

      const token = await this.jwtService.signAsync({
        uuid: account.uuid,
        email,
      } as JWTPayload);

      this.logger.debug(`Account [${email}] logged in`);

      return { token };
    }

    throw new BadRequestException(AuthError.InvalidLoginCredentials);
  }

  async validateAccountAndGetRole(uuid: string): Promise<AccountRole> {
    const account = await this.accountService.findOne({
      select: ['status', 'role'],
      where: { uuid },
    });

    if (hasValue(account)) {
      this.accountService.validateStatus(account.status);

      return account.role;
    }

    throw new BadRequestException(AuthError.InvalidToken);
  }
}
