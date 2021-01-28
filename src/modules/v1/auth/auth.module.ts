import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import Config, { AppConfig } from '#configs';
import { AccountModule } from '#v1/account/account.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AccountModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) =>
        (config.get(Config.App) as AppConfig).jwt,
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
