import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { hasValue } from '#utils/guarder';

import { AccountService } from '../account/account.service';
import { AuthError } from './account.error';
import { LogInDTO } from './dtos/log-in.dto';
import { RegisterDTO } from './dtos/register.dto';
import { LogInResponse } from './responses/log-in.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterDTO): Promise<void> {
    await this.accountService.register(email, password);
  }

  async validateAndSignToken({
    email,
    attempt,
  }: LogInDTO): Promise<LogInResponse> {
    const account = await this.accountService.findByEmail(email);

    if (hasValue(account) && (await account.comparePassword(attempt))) {
      const token = await this.jwtService.signAsync({
        uuid: account.uuid,
        role: account.role,
        email: account.email,
      });

      return { token };
    }

    throw new BadRequestException(AuthError.InvalidLoginCredentials);
  }
}
