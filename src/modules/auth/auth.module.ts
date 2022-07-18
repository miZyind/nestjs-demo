import { ConfigService } from 'nestjs-xion/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import Config from '#configs';
import { UserModule } from '#modules/user/user.module';
import { AuthPublicController } from '#modules/auth/auth.public.controller';
import { AuthService } from '#modules/auth/auth.service';
import { JWTStrategy } from '#modules/auth/strategies/jwt.strategy';
import { SecretStrategy } from '#modules/auth/strategies/secret.strategy';

import type { AppConfig } from '#configs';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) =>
        (config.get(Config.App) as AppConfig).jwt,
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [AuthService, JWTStrategy, SecretStrategy],
  controllers: [AuthPublicController],
})
export class AuthModule {}
