import type { Role } from '#entities/user.entity';
import { AuthError } from '#modules/auth/auth.constant';
import type { LogInDTO } from '#modules/auth/dtos/log-in.dto';
import type { LogInResponse } from '#modules/auth/responses/log-in.response';
import { UserService } from '#modules/user/user.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hasValue } from 'nestjs-xion/guarder';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAttemptAndSignToken({
    email,
    attempt,
  }: LogInDTO): Promise<LogInResponse> {
    const entity = await this.userService.findOne({
      select: ['uuid', 'status', 'password'],
      where: { email },
    });

    if (hasValue(entity) && (await entity.comparePassword(attempt))) {
      this.userService.validateStatus(entity.status);

      const token = await this.jwtService.signAsync({
        uuid: entity.uuid,
        email,
      });

      this.logger.debug(`User [${email}] logged in`);

      return { token };
    }

    throw new BadRequestException(AuthError.InvalidLoginCredentials);
  }

  async validateUserAndGetRole(uuid: string): Promise<Role> {
    const entity = await this.userService.findOne({
      select: ['status', 'role'],
      where: { uuid },
    });

    if (hasValue(entity)) {
      this.userService.validateStatus(entity.status);

      return entity.role;
    }

    throw new BadRequestException(AuthError.InvalidToken);
  }
}
